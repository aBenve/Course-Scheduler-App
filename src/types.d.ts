interface Subject {
  id: string;
  title: string;
  // importance?: "mandatory" | "optional" | "ignore";
  importance?: string;
  isDndShadowItem?: bool;
}

interface Subjects {
  mandatory: Array<Subject>;
  optional: Array<Subject>;
}
