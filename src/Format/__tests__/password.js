import expect from 'expect';

import format from '../password';

describe('Format.password', () => {
  it('should create new', () => {
    expect(format.new('abAB12!@')).toContain({
      password: 'abAB12!@',
      ascii: 8,
      asciiExtended: 0,
      nonPrint: 0,
      unicode: 0,
      lower: 2,
      upper: 2,
      digit: 2,
      symbol: 2,
    });
  });

  it('should format for named types', () => {
    const password = format.new('password');
    expect(format.password(password)).toBe('password');
  });
});
