import React from 'react';
import _ from 'lodash';
import { SelectableCard } from '@daojs/advanced-components/src/index';
import builtinComponents from '@daojs/builtin-components/src/index';
import data from './data.demo';

const {
  Bar, Donut, Line,
} = builtinComponents;

// demo0 singleTab with Donut Chart
const selector0 = {
  selectorType: 'singleTab',
  selectorLabel: 'dimension',
  options: ['age', 'gender', 'branchName'],
  defaultValue: ['age'],
};
const demo0Metric = '销量';
const buildDemo0 = (selectedOptions) => {
  const source = _.groupBy(data, selectedOptions[0]);
  const dimension = Object.getOwnPropertyNames(source);
  const finalSource = _.map(dimension, item => ({
    [selectedOptions[0]]: item,
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
  selectorType: 'singleTab',
  selectorLabel: 'age',
  options: ['ave', 'max', 'min', 'num'],
  defaultValue: ['ave'],
};
const demo1Dimension = 'branchName';
const demo1Metric = 'age';
const buildDemo1 = (selectedOptions) => {
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
    metricDimensions={selectedOptions}
  />);
};

// demo2 multiTab with Bar chart
const selector2 = {
  selectorType: 'multiTab',
  selectorLabel: 'balance',
  options: ['ave', 'max', 'min', 'num', 'sum'],
  defaultValue: ['ave', 'max'],
};
const demo2Dimension = 'branchName';
const demo2Metric = 'age';
const buildDemo2 = (selectedOptions) => {
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
    metricDimensions={selectedOptions}
  />);
};
export default function SelectorChartCardDemo() {
  return (
    <div>
      <SelectableCard renderContent={buildDemo0} {...selector0} />
      <SelectableCard renderContent={buildDemo1} {...selector1} />
      <SelectableCard renderContent={buildDemo2} {...selector2} />
    </div>
  );
}
