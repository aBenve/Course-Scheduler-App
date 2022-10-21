mod utils;

use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
    ops::{Bound, RangeBounds},
    sync::{Arc, Mutex},
};

use anyhow::{anyhow, Result};
use js_sys::Array;
use scheduler::{
    models::{Code, Subject, SubjectCommision},
    option_generator::filters::{ChoiceIterator, CreditCount, SubjectCount},
};
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

fn find_subject_by_code(code: Code) -> Option<Arc<Subject>> {
    let subjects = SUBJECTS.lock().unwrap();
    subjects.iter().find(|s| s.code == code).cloned()
}

fn find_subjects_by_code(codes: Vec<Code>) -> Result<Vec<Arc<Subject>>> {
    codes
        .into_iter()
        //.map(|c| c.parse().unwrap())
        .map(|code| {
            find_subject_by_code(code).ok_or_else(|| anyhow!("Subject {} was not found", code))
        })
        .collect::<Result<Vec<_>>>()
}

fn parse_codes(codes: impl IntoIterator<Item = String>) -> impl Iterator<Item = Code> {
    codes.into_iter().map(|c| c.parse().unwrap())
}

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

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "string[]")]
    pub type StringArray;

    #[wasm_bindgen(typescript_type = "[[string, string], [string, string]][]")]
    pub type CollisionExceptions;
}

impl From<StringArray> for Vec<String> {
    fn from(sa: StringArray) -> Self {
        Array::from(&sa)
            .iter()
            .map(|v| v.as_string().expect("Must be a string array"))
            .collect()
    }
}

impl From<CollisionExceptions> for Vec<((String, String), (String, String))> {
    fn from(ce: CollisionExceptions) -> Self {
        Array::from(&ce)
            .iter()
            .map(|e| {
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
                    (sub_code, com_name)
                });
                (exception.next().unwrap(), exception.next().unwrap())
            })
            .collect()
    }
}

struct OptionalBound<Idx: PartialOrd>(Option<Idx>);

impl<Idx: PartialOrd> OptionalBound<Idx> {
    fn to_bound(&self) -> Bound<&Idx> {
        match self.0.as_ref() {
            Some(bound) => std::ops::Bound::Included(&bound),
            None => std::ops::Bound::Unbounded,
        }
    }
}

struct OptionallyBoundRange<Idx: PartialOrd> {
    start_bound: OptionalBound<Idx>,
    end_bound: OptionalBound<Idx>,
}
impl<Idx: PartialOrd> OptionallyBoundRange<Idx> {
    fn new(start_bound: Option<Idx>, end_bound: Option<Idx>) -> Self {
        Self {
            start_bound: OptionalBound(start_bound),
            end_bound: OptionalBound(end_bound),
        }
    }
}
impl<Idx: PartialOrd> RangeBounds<Idx> for OptionallyBoundRange<Idx> {
    fn start_bound(&self) -> Bound<&Idx> {
        (&self.start_bound).to_bound()
    }
    fn end_bound(&self) -> Bound<&Idx> {
        self.end_bound.to_bound()
    }
}

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
pub struct ChoiceGenerator {
    iter: Box<dyn Iterator<Item = Vec<Option<SubjectCommision>>>>,
}

#[wasm_bindgen]
impl ChoiceGenerator {
    pub fn next_choice(&mut self) -> Choice {
        if let Some(choice) = self.iter.next() {
            let commissions: Vec<_> = choice.into_iter().flatten().collect();
            JsValue::from_serde::<serializer::OptionInfo>(&commissions.into())
                .unwrap()
                .into()
        } else {
            JsValue::null().into()
        }
    }
}

#[wasm_bindgen]
#[derive(Debug, Default)]
pub struct GeneratorBuilder {
    mandatory: Vec<Arc<Subject>>,
    optional: Vec<Arc<Subject>>,
    collision_exceptions: HashSet<((Code, SubjectCommision), (Code, SubjectCommision))>,
    min_credit_count: Option<u32>,
    max_credit_count: Option<u32>,
    min_subject_count: Option<u32>,
    max_subject_count: Option<u32>,
}

#[wasm_bindgen]
impl GeneratorBuilder {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self::default()
    }

    pub fn set_min_credit_count(mut self, min_credit_count: Option<u32>) -> Self {
        self.min_credit_count = min_credit_count;
        self
    }

    pub fn set_max_credit_count(mut self, max_credit_count: Option<u32>) -> Self {
        self.max_credit_count = max_credit_count;
        self
    }

    pub fn set_min_subject_count(mut self, min_subject_count: Option<u32>) -> Self {
        self.min_subject_count = min_subject_count;
        self
    }

    pub fn set_max_subject_count(mut self, max_subject_count: Option<u32>) -> Self {
        self.max_subject_count = max_subject_count;
        self
    }

    pub fn set_mandatory_codes(mut self, mandatory_codes: StringArray) -> Self {
        self.mandatory =
            find_subjects_by_code(parse_codes(Vec::<String>::from(mandatory_codes)).collect())
                .unwrap();
        self
    }

    pub fn set_optional_codes(mut self, optional_codes: StringArray) -> Self {
        self.optional =
            find_subjects_by_code(parse_codes(Vec::<String>::from(optional_codes)).collect())
                .unwrap();
        self
    }

    pub fn set_collision_exceptions(mut self, collision_exceptions: CollisionExceptions) -> Self {
        let collision_exceptions: Vec<((String, String), (String, String))> =
            collision_exceptions.into();
        let find_commission = |sub_code: Code, com_name: String| {
            let sub = find_subject_by_code(sub_code)
                .unwrap_or_else(|| panic!("Coud not find subject {}", sub_code));
            sub.commissions
                .iter()
                .find(|c| c.name == com_name)
                .unwrap_or_else(|| {
                    panic!(
                        "Could not find commission {} from subject {}.",
                        com_name, sub_code
                    )
                })
                .clone()
        };
        self.collision_exceptions = HashSet::from_iter(collision_exceptions.into_iter().map(
            |((sub_a, com_a), (sub_b, com_b))| {
                let code_a = sub_a.parse().unwrap();
                let code_b = sub_b.parse().unwrap();
                (
                    (code_a, find_commission(code_a, com_a)),
                    (code_b, find_commission(code_b, com_b)),
                )
            },
        ));
        self
    }

    pub fn build(self) -> ChoiceGenerator {
        let find_commissions = |subjects: Vec<Arc<Subject>>| {
            subjects
                .into_iter()
                .map(|sub| (sub.code, sub.commissions.clone()))
                .collect::<Vec<_>>()
        };
        let mandatory = find_commissions(self.mandatory);
        let optional = find_commissions(self.optional);

        ChoiceGenerator {
            iter: Box::new(
                generate(mandatory, optional, self.collision_exceptions)
                    .filter_choices(SubjectCount::new(OptionallyBoundRange::new(
                        self.min_subject_count,
                        self.max_subject_count,
                    )))
                    .filter_choices(CreditCount::new(OptionallyBoundRange::new(
                        self.min_credit_count,
                        self.max_credit_count,
                    ))),
            ),
        }
    }
}
