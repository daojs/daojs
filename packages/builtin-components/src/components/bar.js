import _ from 'lodash';
import { compose, withProps, setPropTypes, defaultProps, setDisplayName } from 'recompose';
import PropTypes from 'prop-types';

import AtlasChart from './atlas-chart';

const getOptionDecorator = props => ({
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
    yAxis: props.isHorizontal ? argumentAxis : dependentAxis,
    series: _.map(metricDimensions, dim => ({
      type: 'bar',
      name: _.get(props.key2name, dim, dim),
      data: _.map(source, row => row[dim]),
    })),
    xAxis: props.isHorizontal ? dependentAxis : argumentAxis,
  };
};

const propsTransformer = props => ({
  getOption: getOptionDecorator(props),
});

const enhance = compose(
  setDisplayName('Bar'),
  withProps(propsTransformer),
  setPropTypes({
    key2name: PropTypes.func,
    isHorizontal: PropTypes.bool,
  }),
  defaultProps({
    key2name: _.identity,
    isHorizontal: true,
  }),
);

export default enhance(AtlasChart);
