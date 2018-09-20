import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { ThemeContext } from '@daojs/contexts';
import {
  compose,
  setPropTypes,
  defaultProps,
  branch,
  renderNothing,
  withProps,
  setDisplayName,
} from 'recompose';

const fromRenderProps = (
  RenderPropsComponent,
  propsMapper,
  renderPropName = 'children',
) => (BaseComponent) => {
  const baseFactory = React.createFactory(BaseComponent);
  const renderPropsFactory = React.createFactory(RenderPropsComponent);

  const FromRenderProps = ownerProps =>
    renderPropsFactory({
      [renderPropName]: props =>
        baseFactory({ ...ownerProps, ...propsMapper(props) }),
    });

  return FromRenderProps;
};

const propTypes = {
  source: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  axisDimensions: PropTypes.arrayOf(PropTypes.string),
  metricDimensions: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  getOption: PropTypes.func.isRequired,
  onEvents: PropTypes.objectOf(PropTypes.any),
};

const atlasChartDefaultProps = {
  axisDimensions: [],
  metricDimensions: [],
  title: null,
  onEvents: {},
};

const renderNothingIfNoSource = hasNoSource => branch(hasNoSource, renderNothing);

const propsMapper = (props) => {
  const {
    source,
    axisDimensions,
    metricDimensions,
    title,
  } = props;

  const dimensions = _.chain(source).head().keys().value();

  const axisDimension = _.head(axisDimensions)
    || _.head(dimensions);

  const axisData = _.map(source, (row) => {
    const rawData = row[axisDimension];
    if (axisDimension === 'timestamp' && _.isString(rawData)) {
      return _(rawData).replace('T00:00:00Z', '').replace('T00:00:00.000Z', '');
    }
    return rawData;
  });

  const axisOption = {
    data: axisData,
    type: 'category',
    boundaryGap: false,
  };

  const metricDims = _.isEmpty(metricDimensions) ?
    _.difference(dimensions, [axisDimension]) :
    metricDimensions;

  const titleOption = {
    text: title,
  };

  const option = {
    titleOption,
    backgroundColor: _.get(props, 'style.backgroundColor'),
    ...props.getOption({
      source,
      dimensions,
      axisDimension,
      metricDimensions: metricDims,
      axisData,
      axisOption,
      titleOption,
    }),
  };

  const optionWithColor = props.primaryColor ? _.defaults({
    color: [props.primaryColor, ...props.restColors || []],
  }, option) : option;

  return {
    option: optionWithColor,
    notMerge: true,
    theme: 'theme1',
  };
};

const enhance = compose(
  setDisplayName('AtlasChart'),
  setPropTypes(propTypes),
  defaultProps(atlasChartDefaultProps),
  renderNothingIfNoSource(({ source }) => _.isNil(source) || _.isEmpty(source)),
  fromRenderProps(ThemeContext.Consumer, ({ primaryColor }) => ({ primaryColor })),
  withProps(propsMapper),
);

export default enhance(ReactEcharts);
