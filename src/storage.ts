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
  localStorage.selectedSubjectCategorization = JSON.stringify({
    mandatory,
    optional,
    ignore,
  });
}
