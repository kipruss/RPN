import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({ value, onKeyDown, onChange }) => {
  return (
    <input
      className="input"
      type="text"
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
      autoFocus
      autoComplete="off"
    />
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
