// test.ts
import commissions from "./commissions.json";
import planI13 from "./career-plan-I-13.json";
import planI22 from "./career-plan-I22.json";
import planS from "./career-plan-S10A-Rev18.json";
import student from "./student.json";
import people from "./people.json";
import plans from "./plans.json";

import type { MockMethod } from "vite-plugin-mock";
import { parseInt } from "lodash";

export default [
  {
    url: "/api/commissions/:semester",
    method: "get",
    rawResponse: (req, res) => {
      let url = req.url.split("/");
      let file = url[url.length - 1];
      let { year, semester } =
        /^GRADUATE-(?<year>\d{4})-(?<semester>(?:Second|First)Semester).json$/.exec(
          file
        )!.groups! as { year: string; semester: string };

      res.setHeader('Content-Type', 'application/json');
      if (parseInt(year) <= 2023) {
        res.statusCode = 404;
        res.end();
        return;
      }
      res.end(JSON.stringify(commissions));
    },
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
    url: "/api/plan/:name",
    method: "get",
    response: ({ query }) => {
      console.log(query);
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
  {
    url: "/api/plans.json",
    method: "get",
    response: () => plans,
  },
] as MockMethod[];
