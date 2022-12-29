// test.ts
import commissions from "./commissions.json";
import planI from "./career-plan-I-13.json";
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
      switch (query.name[0]) {
        case "S":
          return planS;
        case "I":
          return planI;
        default:
          return planS;
      }
    },
  },
] as MockMethod[];
