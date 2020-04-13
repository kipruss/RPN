import { operators, operatorsDictionary } from './constants';

const { PLUS, MINUS, TIMES, DIVIDED } = operatorsDictionary;

const operations = {
  [PLUS]: (x, y) => x + y,
  [MINUS]: (x, y) => x - y,
  [TIMES]: (x, y) => x * y,
  [DIVIDED]: (x, y) => x / y,
};

export const calculate = (initialStack) => {
  if (!initialStack.length) {
    return {
      result: null,
      error: true,
    };
  }

  const stack = [...initialStack];

  stack.forEach((el) => {
    if (operators.includes(el)) {
      const [y, x] = [stack.pop(), stack.pop()];
      stack.push(operations[el](x, y));
    } else if (Number.isFinite(Number(el))) {
      stack.push(Number(el));
    } else {
      return {
        error: true,
      }
    }
  });

  const result = stack.pop();
  return {
    result,
    error: initialStack.length !== stack.length,
  };
};
