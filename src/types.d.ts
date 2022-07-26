interface Subject{
    id: string,
    title: string
}

interface Subjects {
    mandatory: Array<Subject>;
    optional: Array<Subject>;
}