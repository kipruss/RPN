import { calculate } from './helper';

const add = (x, y) => x + y;

describe('calculate function', () => {
  it('should return proper result', () => {
    expect(calculate(['5', '8', '+'])).toEqual({
      error: false,
      result: 13,
    });
  });

  it('should return proper result', () => {
    expect(calculate([5, 8, '+'])).toEqual({
      error: false,
      result: 13,
    });
  });

  it('should return proper result', () => {
    expect(calculate('5 5 5 8 + + -'.split(' '))).toEqual({
      error: false,
      result: -13,
    });
  });

  it('should return proper result', () => {
    expect(calculate('-3 -2 * 5 +'.split(' '))).toEqual({
      error: false,
      result: 11,
    });
  });

  it('should return proper result', () => {
    expect(calculate('5 9 1 - /'.split(' '))).toEqual({
      error: false,
      result: 0.625,
    });
  });

  it('should return error true', () => {
    expect(calculate('5 -'.split(' '))).toEqual({
      error: true,
      result: NaN,
    });
  });

  it('should return error true', () => {
    expect(calculate([])).toEqual({
      error: true,
      result: null,
    });
  });
});