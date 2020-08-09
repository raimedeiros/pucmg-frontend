/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

import { createTracing } from 'trace_events';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isAuthenticated = () => {
  const credentials = { facebook: true };
  console.log(credentials);
  return { credentials };
};
