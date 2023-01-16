// test.ts
import commissions from "./commissions.json";
import planI13 from "./career-plan-I-13.json";
import planI22 from "./career-plan-I22.json";
import planS from "./career-plan-S10A-Rev18.json";
import student from "./student.json";
import people from "./people.json";

import type { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/commissions",
    method: "get",
    response: commissions,
  },
  {
    url: "/api/people",
    method: "get",
    response: people,
  },
  {
    url: "/api/student",
    method: "get",
    response: student,
  },
  {
    url: "/api/plan",
    method: "get",
    response: ({ query }) => {
      switch (query.name) {
        case "S10 A - Rev18":
          return planS;
        case "I-13":
          return planI13;
        case "I22":
          return planI22;
        default:
          return planS;
      }
    },
  },
] as MockMethod[];
