import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import { validate } from '../utils';

export default class Waterfall extends PureComponent {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.shape({
      time: PropTypes.string,
      value: PropTypes.number,
    })).isRequired,
  }

  render() {
    const { source } = this.props;
    validate(source);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter(params) {
          const target = _.get(params, '[1].value') !== '-'
            ? _.get(params, 1)
            : _.get(params, 2);
          return `${target.name}<br/>${target.seriesName} : ${target.value}`;
        },
      },
      legend: {
        show: false,
      },
      xAxis: [
        {
          type: 'category',
          splitLine: { show: false },
          data: _.chain(source).map('time').value,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: (() => {
        const data = _.reduce(source, (memo, cur) => (cur.value >= 0 ? {
          positive: [...memo.positive, cur.value],
          negative: [...memo.negative, '-'],
          assistant: [...memo.assistant, memo.sum],
          sum: memo.sum + cur.value,
        } : {
          positive: [...memo.positive, '-'],
          negative: [...memo.negative, -cur.value],
          assistant: [...memo.assistant, memo.sum + cur.value],
          sum: memo.sum + cur.value,
        }), {
          assistant: [],
          positive: [],
          negative: [],
          sum: 0,
        });

        console.log(data);

        return [
          {
            name: 'assistant',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)',
              },
            },
            data: data.assistant,
          },
          {
            name: 'positive',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                },
              },
            },
            data: data.positive,
          },
          {
            name: 'negtive',
            type: 'bar',
            stack: 'total',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'bottom',
                },
              },
            },
            data: data.negative,
          },
        ];
      })(),
    };

    return (
      <ReactEcharts option={option} {...this.props} />
    );
  }
}
