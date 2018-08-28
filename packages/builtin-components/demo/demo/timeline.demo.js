import React from 'react';
import builtinComponents from '../../src/index';

const {
  TimeLine,
} = builtinComponents;
const groups = [{ id: 1, title: 'group1' }, { id: 2, title: 'group2' }];
const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start: new Date(2018, 1, 1),
    end: new Date(2018, 2, 1),
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start: new Date(2018, 3, 1),
    end: new Date(2018, 4, 1),
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start: new Date(2018, 7, 1),
    end: new Date(2018, 8, 15),
  },
];
export default function TimeLineDemo() {
  return (<TimeLine
    groups={groups}
    items={items}
  />);
}
