import React from 'react';
import PropTypes from 'prop-types';

export default function TextBlock(props) {
  return (
    <span>{props.text}</span>
  );
}

TextBlock.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

TextBlock.defaultProps = {
  text: '',
};
