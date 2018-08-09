import React from 'react';
import { LinkedChartPair } from '@daojs/advanced-components/src/index';
import data from './data.demo';

const charts = [
  { type: 'bar', metric: '销量', dimension: 'age' },
  { type: 'donut', metric: '销量', dimension: 'skuType' },
];
const source = data;
export default function relativeChartsDemo() {
  return (
    <div>
      <LinkedChartPair charts={charts} source={source} />
    </div>
  );
}
