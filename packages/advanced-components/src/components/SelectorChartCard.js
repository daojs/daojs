import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import builtinComponents from '@daojs/builtin-components/src/index';


const {
  RadioGroup, MultiSelector,
} = builtinComponents;

const buildSingleTab = ({
  label, enums, defaultValue, update,
}) => (
  <RadioGroup
    label={label}
    enums={enums}
    defaultValue={defaultValue[0]}
    update={update}
  />
);
buildSingleTab.propTypes = {
  label: PropTypes.string.isRequired,
  enums: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string.isRequired,
  update: PropTypes.func,
};
buildSingleTab.defaultProps = {
  update: _.noop,
};
const buildMultiTab = ({
  label, enums, defaultValue, update, currentValue,
}) => (
  <MultiSelector
    label={label}
    defaultValue={defaultValue}
    enums={enums}
    update={update}
    currentValue={currentValue}
  />
);
buildMultiTab.propTypes = {
  label: PropTypes.string.isRequired,
  enums: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string.isRequired,
  update: PropTypes.func,
  currentValue: PropTypes.arrayOf(PropTypes.string),
};
buildMultiTab.defaultProps = {
  update: _.noop,
  currentValue: undefined,
};
const selectorTypeDictionary = {
  singleTab: buildSingleTab,
  multiTab: buildMultiTab,
};

export default class SelectorChartCard extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    enums: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultValue: PropTypes.arrayOf(PropTypes.string).isRequired,
    buildChart: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
    };
    this.update = this.update.bind(this);
  }
  update(value) {
    this.setState({
      value,
    });
  }
  render() {
    const {
      type,
      label,
      enums,
      buildChart,
      defaultValue,
    } = this.props;
    return (
      <div>
        <div>
          {selectorTypeDictionary[type]({
            label,
            enums,
            defaultValue,
            currentValue: this.state.value,
            update: this.update,
          })}
          {buildChart(_.isObject(this.state.value) ? this.state.value : [this.state.value])}
        </div>
      </div>
    );
  }
}
