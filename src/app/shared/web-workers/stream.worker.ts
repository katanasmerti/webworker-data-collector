/// <reference lib="webworker" />

import { generateItems } from '../helpers/helpers';

addEventListener('message', ({ data }) => {
  const response = generateItems(data).slice(-10);
  postMessage(response);
});
