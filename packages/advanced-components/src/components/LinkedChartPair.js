import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import builtinComponents from '@daojs/builtin-components/src/index';

const {
  Bar, Donut, Line,
} = builtinComponents;
const buildLineChart = ({
  source, dimension, metric, onClick,
}) => (<Line
  source={source}
  axisDimensions={dimension}
  metricDimensions={metric}
  onEvents={{ click: onClick }}
/>);
buildLineChart.propTypes = {
  source: PropTypes.arrayOf(PropTypes.object).isRequired,
  dimension: PropTypes.arrayOf(PropTypes.string).isRequired,
  metric: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};
buildLineChart.defaultProps = {
  onClick: _.noop(),
};

const buildBarChart = ({
  source, dimension, metric, onClick,
}) => (<Bar
  source={source}
  axisDimensions={dimension}
  metricDimensions={metric}
  onEvents={{ click: onClick }}
/>);
buildBarChart.propTypes = {
  source: PropTypes.arrayOf(PropTypes.object).isRequired,
  dimension: PropTypes.arrayOf(PropTypes.string).isRequired,
  metric: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};
buildBarChart.defaultProps = {
  onClick: _.noop(),
};

const buildDonutChart = ({
  source, metric, onClick,
}) => (<Donut
  title={metric}
  source={source}
  onEvents={{ click: onClick }}
/>);
buildDonutChart.propTypes = {
  source: PropTypes.arrayOf(PropTypes.object).isRequired,
  metric: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
buildDonutChart.defaultProps = {
  onClick: _.noop(),
};

const chartTypeDictionary = {
  line: buildLineChart,
  bar: buildBarChart,
  donut: buildDonutChart,
};

export default class LinkedChartPair extends PureComponent {
  static propTypes = {
    charts: PropTypes.arrayOf(PropTypes.object).isRequired,
    source: PropTypes.arrayOf(PropTypes.object).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      dimension: null,
    };
  }
  render() {
    const { charts, source } = this.props;
    const chart0 = charts[0];
    const chart1 = charts[1];
    const source0 = _.groupBy(source, chart0.dimension);
    const dimension0 = Object.getOwnPropertyNames(source0);
    const finalSource0 = _.map(dimension0, item => ({
      [chart0.dimension]: item,
      [chart0.metric]: source0[item].length,
    }));
    const source1 = this.state.dimension !== null ?
      _.groupBy(_.filter(
        source,
        [chart0.dimension,
          _.isNumber(source[0][chart0.dimension]) ?
            _.toNumber(this.state.dimension) : this.state.dimension,
        ],
      ), chart1.dimension) : _.groupBy(source, chart1.dimension);
    const dimension1 = Object.getOwnPropertyNames(source1);
    const finalSource1 = _.map(dimension1, item => ({
      [chart1.dimension]: item,
      [chart1.metric]: source1[item].length,
    }));
    return (
      <div>
        <Row align="middle" type="flex">
          <Col span={12}>
            {chartTypeDictionary[chart0.type]({
              source: finalSource0,
              dimension: [chart0.dimension],
              metric: chart0.type === 'donut' ? chart0.metric : [chart0.metric],
              onClick: (params) => {
                this.setState(() => ({
                  dimension: params.name,
                }));
              },
            })}
          </Col>
          <Col span={12}>
            {chartTypeDictionary[chart1.type]({
              source: finalSource1,
              dimension: [chart1.dimension],
              metric: chart1.type === 'donut' ? chart1.metric : [chart1.metric],
            })}
          </Col>
        </Row>
      </div>
    );
  }
}
