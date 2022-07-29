mod utils;

use std::{
    cell::RefCell,
    collections::HashSet,
    iter::FromIterator,
    sync::{Arc, Mutex},
};

use js_sys::Array;
use scheduler::models::{Code, Subject, SubjectCommision};
use wasm_bindgen::{prelude::*, JsCast};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

use scheduler::loaders::json_loader;
use wasm_bindgen_futures::JsFuture;
use web_sys::{window, Request, RequestInit, RequestMode, Response};

use url::Url;

#[wasm_bindgen]
pub enum Semester {
    First,
    Second,
}

#[wasm_bindgen]
pub async fn load_from_api(year: u32, semester: Semester) {
    let mut opts = RequestInit::new();
    opts.method("GET").mode(RequestMode::Cors);
    let window = window().unwrap();
    let mut url = Url::parse(
        &window
            .document()
            .unwrap()
            .location()
            .unwrap()
            .href()
            .unwrap(),
    )
    .unwrap()
    .join("/api")
    .unwrap();
    url.set_query(Some(&format!(
        "year={}&period={}",
        year,
        match semester {
            Semester::First => "FirstSemester",
            Semester::Second => "SecondSemester",
        }
    )));

    //location.set_pathname("/api?").unwrap();
    let request = Request::new_with_str_and_init(url.as_str(), &opts).unwrap();
    let resp = JsFuture::from(window.fetch_with_request(&request))
        .await
        .unwrap();

    let resp: Response = resp.dyn_into().unwrap();
    let body = JsFuture::from(resp.text().unwrap())
        .await
        .unwrap()
        .as_string()
        .unwrap();

    let data = json_loader::load_from_string(&body).unwrap();
    let mut subjects = SUBJECTS.lock().unwrap();
    *subjects = data;
}

static SUBJECTS: Mutex<Vec<Arc<Subject>>> = Mutex::new(vec![]);

#[wasm_bindgen]
pub fn set_panic_hook() {
    utils::set_panic_hook();
}

#[wasm_bindgen]
pub struct SubjectInfo {
    code: Code,
    name: String,
    pub credits: u8,
}

#[wasm_bindgen]
impl SubjectInfo {
    #[wasm_bindgen(getter)]
    pub fn code(&self) -> String {
        self.code.to_string()
    }

    #[wasm_bindgen(getter)]
    pub fn name(&self) -> String {
        self.name.clone()
    }
}

#[wasm_bindgen]
pub fn get_subject_info(code: String) -> Option<SubjectInfo> {
    let code: Code = code.parse().unwrap();
    let subjects = SUBJECTS.lock().unwrap();
    subjects
        .iter()
        .find(|s| s.code == code)
        .map(|s| SubjectInfo {
            code: s.code,
            name: s.name.clone(),
            credits: s.credits,
        })
}

use scheduler::option_generator::generate;
thread_local! {
    pub static OPTION_ITERATOR: RefCell<Option<Box<dyn Iterator<Item = Vec<Option<SubjectCommision>>>>>> =
        RefCell::new(None);
}

fn get_next_option() -> Option<Vec<Option<SubjectCommision>>> {
    OPTION_ITERATOR.with(|option_iterator| {
        let iterator = &mut option_iterator.borrow_mut();
        iterator.as_mut().unwrap().next()
    })
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "string[]")]
    pub type StringArray;

    #[wasm_bindgen(typescript_type = "[[string, string], [string, string]][]")]
    pub type CollisionExceptions;
}

#[wasm_bindgen]
pub fn start_generator(
    mandatory_codes: StringArray,
    optional_codes: StringArray,
    collision_exceptions: CollisionExceptions,
) {
    let subjects = SUBJECTS.lock().unwrap();
    let find_subject = |code: Code| {
        subjects
            .iter()
            .find(|s| s.code == code)
            .ok_or(format!("Could not find subject with code {}", code))
    };
    let find_subjects = |codes: Vec<String>| {
        codes
            .into_iter()
            .map(|c| c.parse().unwrap())
            .map(|code| find_subject(code).map(|sub| (code, sub)))
            .collect::<Result<Vec<_>, _>>()
            .expect("A subject was not found.")
    };
    let find_commissions = |codes: StringArray| {
        find_subjects(
            Array::from(&codes)
                .iter()
                .map(|v| v.as_string().expect("Must be a string array"))
                .collect(),
        )
        .into_iter()
        .map(|(code, sub)| (code, sub.commissions.clone()))
        .collect::<Vec<_>>()
    };
    let find_commission = |sub_code: Code, com_name: String| {
        let sub =
            find_subject(sub_code).unwrap_or_else(|_| panic!("Coud not find subject {}", sub_code));
        sub.commissions
            .iter()
            .find(|c| c.name == com_name)
            .unwrap_or_else(|| {
                panic!(
                    "Could not find commission {} from subject {}.",
                    com_name, sub_code
                )
            })
    };
    let mandatory = find_commissions(mandatory_codes);
    let optional = find_commissions(optional_codes);

    let collision_exceptions =
        HashSet::from_iter(Array::from(&collision_exceptions).iter().map(|e| {
            let exception: Array = e.into();
            assert_eq!(exception.length(), 2);
            let mut exception = exception.iter().map(|pair| {
                let commission: Array = pair.into();
                assert_eq!(commission.length(), 2);
                let (sub_code, com_name) = (
                    commission.get(0).as_string().unwrap(),
                    commission.get(1).as_string().unwrap(),
                );
                let sub_code = sub_code.parse().unwrap();
                (sub_code, find_commission(sub_code, com_name).clone())
            });
            (exception.next().unwrap(), exception.next().unwrap())
        }));

    OPTION_ITERATOR.with(|option_iterator| {
        *option_iterator.borrow_mut() = Some(generate(mandatory, optional, collision_exceptions));
    });
}

//struct OptionInfo {
//subjects: Vec<SubjectInfo>,
//days:
//}

//#[wasm_bindgen]
//struct SubjectCommissionInfo {
//name: String,
//pub subject: SubjectInfo,
//pub
//}

mod serializer;

#[wasm_bindgen(typescript_custom_section)]
const IOPTION: &'static str = r#"
export type DaysOfTheWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface Time {
    hour: number,
    minutes: number,
}

export interface Choice {
    subjects: {
        [key: string]: {
            name: string,
            credits: number,
            commission: string,
        },
    },
    week: {
        [key in DaysOfTheWeek]: {
            subject: string,
            building?: string,
            span: {
                start: Time,
                end: Time,
            },
        }[];
    },
}
"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "Choice")]
    pub type Choice;
}

#[wasm_bindgen]
pub fn next_choice() -> JsValue {
    if let Some(choice) = get_next_option() {
        let commissions: Vec<_> = choice.into_iter().flatten().collect();
        JsValue::from_serde::<serializer::OptionInfo>(&commissions.into()).unwrap()
    } else {
        JsValue::null()
    }
}
