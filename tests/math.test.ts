// tests/math.test.ts

import { add } from '../utils/math';

describe('Addition Function', () => {
  it('should return the correct sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should return the correct sum of a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2);
  });

  it('should return the correct sum of two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  it('should return the correct sum when adding zero', () => {
    expect(add(4, 0)).toBe(4);
  });
});
