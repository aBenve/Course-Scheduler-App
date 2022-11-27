// test.ts
import mockData from './mock-data.json';

import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api',
    method: 'get',
    response: mockData,
  },
] as MockMethod[]
