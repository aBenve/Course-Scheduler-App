mod utils;

use std::sync::{Arc, Mutex};

use scheduler::models::Subject;
use wasm_bindgen::{prelude::*, JsCast};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

//use scheduler::option_generator::generate;
use scheduler::loaders::json_loader;
use wasm_bindgen_futures::JsFuture;
use web_sys::{window, Request, RequestInit, RequestMode, Response};

use url::Url;

#[wasm_bindgen]
pub async fn load_from_api() {
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
    url.set_query(Some("year=2022&period=SecondSemester"));

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
pub fn test() {
    //generate(mandatory, vectors)
    //Ok(subjects[0].name.clone())
    alert(&SUBJECTS.lock().unwrap()[0].name);
}
