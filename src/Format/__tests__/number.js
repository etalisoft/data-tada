import expect from 'expect';

import format from '../number';

describe('format.number', () => {
  it('should format for named types', () => {
    [-12345.6789, 12345.6789].forEach(value => {
      const FORMAT = {
        default: value,
        abs: Math.abs(value),
        floor: Math.floor(value),
        ceil: Math.ceil(value),
        trunc: Math.trunc(value),
        round: Math.round(value),
        fixed2: value.toFixed(2),
        exponential2: value.toExponential(2),
        usd: value.toLocaleString('en', { style: 'currency', currency: 'USD' }),
        locale: value.toLocaleString(),
        binary: Math.floor(value).toString(2),
        octal: Math.floor(value).toString(8),
        hex: Math.floor(value).toString(16),
      };
      Object.keys(FORMAT).forEach(k => {
        const expected = FORMAT[k];
        const actual = format[k](value);
        expect(actual).toBe(expected, `${k}: Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
      });
      expect(format.exponential(3)(-12345.6789)).toBe((-12345.6789).toExponential(3));
      expect(format.base(9)(-12345.6789)).toBe(Math.floor(-12345.6789).toString(9));
    });
  });
});
