use enum_map::EnumMap;
use scheduler::models::{Combinable, DaysOfTheWeek, SubjectCommision, Week};
use serde::Serialize;
use std::{collections::HashMap, fmt::Display};

#[derive(Clone, Serialize)]
struct Subject {
    name: String,
    credits: u32,
    commission: String,
}

#[derive(Clone, Copy, Hash, PartialEq, Eq, Serialize)]
#[serde(into = "String")]
struct Code {
    high: u8,
    low: u8,
}

impl From<Code> for String {
    fn from(Code { high, low }: Code) -> Self {
        format!("{:02}.{:02}", high, low)
    }
}

impl Display for Code {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let s: String = (*self).into();
        f.write_str(&s)
    }
}

impl From<scheduler::models::Code> for Code {
    fn from(scheduler::models::Code { high, low }: scheduler::models::Code) -> Self {
        Self { high, low }
    }
}

#[derive(Clone, Copy, Serialize)]
struct Time {
    hour: u8,
    minutes: u8,
}

impl From<scheduler::models::Time> for Time {
    fn from(scheduler::models::Time { hour, minutes }: scheduler::models::Time) -> Self {
        Self { hour, minutes }
    }
}

#[derive(Clone, Copy, Serialize)]
struct Span {
    start: Time,
    end: Time,
}

impl From<scheduler::models::Span> for Span {
    fn from(scheduler::models::Span { start, end }: scheduler::models::Span) -> Self {
        Self {
            start: start.into(),
            end: end.into(),
        }
    }
}

#[derive(Clone, Serialize)]
struct Task {
    subject: Code,
    building: Option<String>,
    //classroom: String,
    span: Span,
}

#[derive(Clone, Serialize)]
pub struct OptionInfo {
    subjects: HashMap<Code, Subject>,
    week: EnumMap<DaysOfTheWeek, Vec<Task>>,
}

impl From<Vec<SubjectCommision>> for OptionInfo {
    fn from(commissions: Vec<SubjectCommision>) -> Self {
        let subjects: HashMap<_, _> = commissions
            .iter()
            .map(|c| {
                let s = c.subject.upgrade().unwrap();
                (
                    s.code.into(),
                    Subject {
                        commission: c.name.clone(),
                        name: s.name.clone(),
                        credits: s.credits as u32,
                    },
                )
            })
            .collect();

        let week = commissions
            .iter()
            .map(|c| &c.schedule)
            .fold(Week::empty(), |a, b| Week::combine(&a, b))
            .days
            .map(|_, scheduler::models::Day { tasks, .. }| {
                tasks
                    .iter()
                    .map(|task| Task {
                        subject: task.info.subject.upgrade().unwrap().code.into(),
                        span: task.span.into(),
                        building: task.info.building.name.clone(),
                    })
                    .collect()
            });

        Self { subjects, week }
    }
}
