import * as React from 'react';

const is_Empty = (object) => {
  return Object.keys(object).length === 0;
}

export default is_Empty;