// test.ts
import commissions from './commissions.json';
import plan from './career-plan.json';
import student from './student.json';
import people from './people.json';

import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/commissions',
    method: 'get',
    response: commissions,
  },
  {
    url: '/api/people',
    method: 'get',
    response: people,
  },
  {
    url: '/api/student',
    method: 'get',
    response: student,
  },
  {
    url: '/api/plan',
    method: 'get',
    response: plan,
  },
] as MockMethod[]
