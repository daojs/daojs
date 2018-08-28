import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
};

export default class TimeLine extends Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }
  constructor(props) {
    super(props);
    const { groups, items } = this.props;
    const defaultTimeStart = moment()
      .startOf('year')
      .toDate();
    const defaultTimeEnd = moment()
      .startOf('year')
      .add(1, 'year')
      .toDate();
    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
    };
  }

  render() {
    const {
      groups, items, defaultTimeStart, defaultTimeEnd,
    } = this.state;
    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        fullUpdate
        sidebarContent={<div>Above The Left</div>}
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        showCursorLine
        canMove={false}
        canResize="both"
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      />
    );
  }
}
