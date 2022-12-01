export function loadSelectedSubjects(): Set<string> {
  const { mandatory, optional, ignore } = loadSelectedSubjectCategorization();
  return new Set([...mandatory, ...optional, ...ignore]);
}

export function saveSelectedSubjects(selectedSubjects: Set<string>) {
  saveSelectedSubjectCategorization([], Array.from(selectedSubjects), []);
}

export function loadSelectedSubjectCategorization(): {
  mandatory: string[];
  optional: string[];
  ignore: string[];
} {
  const all = JSON.parse(localStorage.getItem("selectedSubjectCategorization"));
  return all ?? { mandatory: [], optional: [], ignore: [] };
}

export function saveSelectedSubjectCategorization(
  mandatory: string[],
  optional: string[],
  ignore: string[]
) {
  localStorage.setItem(
    "selectedSubjectCategorization",
    JSON.stringify({ mandatory, optional, ignore })
  );
}
