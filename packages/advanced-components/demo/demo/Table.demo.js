import React from 'react';
import { Table } from '@daojs/advanced-components/src/index';
import builtinComponents from '@daojs/builtin-components/src/index';
import fakeData from '@daojs/builtin-components/demo/demo/fakeData.demo';

const {
  Bar, Donut, Cumulative, K,
} = builtinComponents;
const col = 2;
const dataDonut = [{
  season: 'spring',
  value: 10,
}, {
  season: 'summer',
  value: 20,
}, {
  season: 'autumn',
  value: 40,
}, {
  season: 'winter',
  value: 80,
}];
const sourceK = [
  {
    Date: '2017-10-24', open: 20, close: 30, lowest: 10, highest: 35,
  },
  {
    Date: '2017-10-25', open: 40, close: 35, lowest: 30, highest: 55,
  },
  {
    Date: '2017-10-26', open: 33, close: 38, lowest: 30, highest: 40,
  },
  {
    Date: '2017-10-27', open: 40, close: 40, lowest: 32, highest: 42,
  },
];
const source = [
  () => (<Bar
    source={fakeData.timeStampData}
    isHorizontal={false}
    axisDimensions={['timestamp']}
    metricDimensions={['value1', 'value2', 'value3', 'value4']}
  />),
  () => (<Donut title="Donut" subTitle="" source={dataDonut} />),
  () => (<Cumulative
    axisDimensions={['timestamp']}
    metricDimensions={['value']}
    source={[{
        timestamp: '2018/1/1',
        value: 10,
    }, {
        timestamp: '2018/1/2',
        value: 20,
    }, {
        timestamp: '2018/1/3',
        value: 40,
    }, {
        timestamp: '2018/1/4',
        value: 80,
    }]}
  />),
  () => (<K source={sourceK} />),
];
export default function TableDemo() {

  return (
    <div>
      <Table col={col} cells={source} />
    </div>
  );
}
