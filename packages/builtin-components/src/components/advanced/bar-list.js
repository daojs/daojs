import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import map from 'lodash/map';
import { List } from 'antd';
import AtlasChart from '../atlas-chart';

export default class BarList extends PureComponent { //eslint-disable-line
  static propTypes = {
    bar: PropTypes.objectOf(PropTypes.any).isRequired,
    list: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  render() {
    const { bar } = this.props;
    const { list } = this.props;

    return (
      <div>
        <div className="ant-col-xl-16">
          <AtlasChart
            {...bar}
            getOption={({
              source,
              metricDimensions,
              axisOption,
            }) => {
              const argumentAxis = {
                boundaryGap: true,
                ...axisOption,
              };

              const dependentAxis = {};

              return {
                legend: {},
                tooltip: {},
                yAxis: bar.isHorizontal ? argumentAxis : dependentAxis,
                series: map(metricDimensions, dim => ({
                  type: 'bar',
                  name: get(bar.key2name, dim, dim),
                  data: map(source, row => row[dim]),
                })),
                xAxis: bar.isHorizontal ? dependentAxis : argumentAxis,
              };
            }}
          />
        </div>
        <div className="ant-col-xl-8" style={{ marginTop: '35px' }}>
          <List
            bordered={false}
            dataSource={list.source}
            renderItem={list.renderItem}
          />
        </div>
      </div>
    );
  }
}
