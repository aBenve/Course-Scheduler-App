interface Subject {
  id: string;
  title: string;
  isDndShadowItem?: bool;
}

interface Subjects {
  mandatory: Array<Subject>;
  optional: Array<Subject>;
}
