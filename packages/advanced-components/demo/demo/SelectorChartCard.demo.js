import React from 'react';
import _ from 'lodash';
import { SelectorChartCard } from '@daojs/advanced-components/src/index';
import builtinComponents from '@daojs/builtin-components/src/index';
import data from './data.demo';

const {
  Bar, Donut, Line,
} = builtinComponents;

// demo0 singleTab with Donut Chart
const selector0 = {
  type: 'singleTab',
  label: 'dimension',
  enums: ['age', 'gender', 'branchName'],
  defaultValue: ['age'],
};
const demo0Metric = '销量';
const buildDemo0 = (selectedEnums) => {
  const source = _.groupBy(data, selectedEnums[0]);
  const dimension = Object.getOwnPropertyNames(source);
  const finalSource = _.map(dimension, item => ({
    [selectedEnums[0]]: item,
    [demo0Metric]: source[item].length,
  }));
  return (<Donut
    title={demo0Metric}
    source={finalSource}
  />);
};
const metricFuncDictionary = {
  ave: arr => _.mean(arr),
  max: arr => _.max(arr),
  min: arr => _.min(arr),
  num: arr => arr.length,
  sum: arr => _.sum(arr),
};

// demo1 singleTab with Line chart
const selector1 = {
  type: 'singleTab',
  label: 'age',
  enums: ['ave', 'max', 'min', 'num'],
  defaultValue: ['ave'],
};
const demo1Dimension = 'branchName';
const demo1Metric = 'age';
const buildDemo1 = (selectedEnums) => {
  const source = _.groupBy(data, demo1Dimension);
  const dimension = Object.getOwnPropertyNames(source);
  const finalSource = _.map(dimension, item => ({
    [demo1Dimension]: item,
    ave: metricFuncDictionary.ave(_.map(source[item], demo1Metric)),
    max: metricFuncDictionary.max(_.map(source[item], demo1Metric)),
    min: metricFuncDictionary.min(_.map(source[item], demo1Metric)),
    num: metricFuncDictionary.num(_.map(source[item], demo1Metric)),
  }));
  return (<Line
    source={finalSource}
    axisDimensions={[demo1Dimension]}
    metricDimensions={selectedEnums}
  />);
};

// demo2 multiTab with Bar chart
const selector2 = {
  type: 'multiTab',
  label: 'balance',
  enums: ['ave', 'max', 'min', 'num', 'sum'],
  defaultValue: ['ave', 'max'],
};
const demo2Dimension = 'branchName';
const demo2Metric = 'age';
const buildDemo2 = (selectedEnums) => {
  const source = _.groupBy(data, demo2Dimension);
  const dimension = Object.getOwnPropertyNames(source);
  const finalSource = _.map(dimension, item => ({
    [demo2Dimension]: item,
    ave: metricFuncDictionary.ave(_.map(source[item], demo2Metric)),
    max: metricFuncDictionary.max(_.map(source[item], demo2Metric)),
    min: metricFuncDictionary.min(_.map(source[item], demo2Metric)),
    num: metricFuncDictionary.num(_.map(source[item], demo2Metric)),
    sum: metricFuncDictionary.sum(_.map(source[item], demo2Metric)),
  }));
  return (<Bar
    source={finalSource}
    axisDimensions={[demo2Dimension]}
    metricDimensions={selectedEnums}
  />);
};
export default function SelectorChartCardDemo() {
  return (
    <div>
      <SelectorChartCard buildChart={buildDemo0} {...selector0} />
      <SelectorChartCard buildChart={buildDemo1} {...selector1} />
      <SelectorChartCard buildChart={buildDemo2} {...selector2} />
    </div>
  );
}
