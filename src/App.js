import React, { PureComponent } from 'react';
import Input from 'components/Input';
import { operators } from './constants';
import { calculate } from './helper';
import './App.css';

class App extends PureComponent {
  state = {
    stack: [],
    value: '',
    message: '',
  };

  onKeyDown = (e) => {
    if (e.keyCode === 27 || e.key === 'Escape') {
      this.setState({
        stack: [],
      });
    } else if (e.keyCode === 13 || e.key === 'Enter') {
      this.calculate();
    }
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  renderMessage = () => {
    const { message } = this.state;

    if (!message.length) {
      return null;
    }

    return (
      <p className="error">{ message }</p>
    );
  };

  renderStack = () => {
    const { stack } = this.state;

    if (!stack.length) {
      return null;
    }

    return (
      <p className="stack">{ `[${stack.join(' ')}]` }</p>
    );
  };

  calculate = () => {
    const { value, stack } = this.state;
    let message = '';
    let outputStack = [];
    let newValue = '';

    if (value) {
      const inputArray = value.split(' ');
      if (inputArray.length > 1) {
        const { result, error } = calculate([...stack, ...inputArray]);
        if (error) {
          message = 'Can not count';
          outputStack = [...stack, ...inputArray];
        } else {
          outputStack = [result];
        }
      } else {
        if (operators.includes(value)) {
          if (stack.length > 1) {
            const { result, error } = calculate([...stack.slice(-2), value]);
            if (error) {
              message = 'Incorrect input string1';
              outputStack = [...stack];
              newValue = value;
            } else {
              outputStack = [...stack.slice(0, -2), result];
            }
          } else {
            message = 'Not enough numbers to count';
            outputStack = [...stack];
            newValue = value;
          }
        } else if (Number.isFinite(Number(value))) {
          outputStack = [...stack, value];
        } else {
          message = 'Incorrect value';
          outputStack = [...stack];
          newValue = value;
        }
      }
    } else {
      message = 'Empty input string';
      outputStack = [...stack];
    }

    this.setState({
      stack: outputStack,
      value: newValue,
      message,
    });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="app">
        <h1 className="header">Reverse Polish notation calculator</h1>
        <p>
          <Input
            value={value}
            onKeyPress={this.onKeyPress}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
          />
        </p>
        { this.renderStack() }
        { this.renderMessage() }
        <p className="note">Press <em>Enter</em> for calculation and <em>Esc</em> for clear cache</p>
      </div>
    );
  }
}

export default App;
