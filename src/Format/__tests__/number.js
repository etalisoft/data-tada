import expect from 'expect';

import format from '../number';

describe('Format.number', () => {
  it('should create new', () => {
    const valid = format.new('123.45');
    expect(valid).toBeA('number');

    const invalid = format.new({});
    expect(isNaN(invalid)).toBe(true);
  });

  it('should format for named types', () => {
    expect(format.positiveInfinity()).toBe(Number.POSITIVE_INFINITY);
    expect(format.negativeInfinity()).toBe(Number.NEGATIVE_INFINITY);
    expect(format.zero()).toBe(0);
    expect(isNaN(format.nan())).toBe(true);
    expect(format.number('123.45')).toBe(123.45);
    expect(format.abs(-123)).toBe(Math.abs(-123));
    expect(format.floor(123.4)).toBe(Math.floor(123.4));
    expect(format.ceil(123.4)).toBe(Math.ceil(123.4));
    expect(format.trunc(123.4)).toBe(Math.trunc(123.4));
    expect(format.round(123.4)).toBe(Math.round(123.4));
    expect(format.bound(-100, 100)(-123.4)).toBe(-100);
    expect(format.min(-100)(-123.4)).toBe(-123.4);
    expect(format.max(100)(-123.4)).toBe(100);
    expect(format.fixed(3)(-123.4)).toBe((-123.4).toFixed(3));
    expect(format.percent(2)(-0.1234)).toBe(`${(-0.1234 * 100).toFixed(2)}%`);
    expect(format.exponential(3)(-123.4)).toBe((-123.4).toExponential(3));
    expect(format.usd(12345.67)).toBe('$12,345.67');
    expect(format.locale()(-123.4)).toBe((-123.4).toLocaleString());
    expect(format.binary(123)).toBe((123).toString(2));
    expect(format.octal(123)).toBe((123).toString(8));
    expect(format.hex(123)).toBe((123).toString(16));
    expect(format.base(9)(123)).toBe((123).toString(9));
  });
});
