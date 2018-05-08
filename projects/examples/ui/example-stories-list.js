import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import _ from 'lodash';
import JSONTree from 'react-json-tree';

const { Panel } = Collapse;

const ExampleStoriesList = ({ categories }) => (
  <Collapse>
    {_.map(categories, ({ name, stories }) => (
      <Panel header={name} key={name}>
        <JSONTree data={stories} />
      </Panel>
    ))}
  </Collapse>
);

ExampleStoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ExampleStoriesList;
