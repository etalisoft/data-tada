import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../number.js';

describe('parser.number', () => {
  it('should return a SyncPromise', () => {
    const result = parser()();
    expect(result).toBeA(SyncPromise);
  });

  it('should support returning a Promise', () => {
    const result = parser({ model: Promise })();
    expect(result).toBeA(Promise);
  });

  it('should resolve/reject on required', () => {
    const VALUES = {
      null: null,
      undefined: undefined,
      empty: '',
      '()=>null': { toString: () => null },
      '()=>undefined': { toString: () => undefined },
      '()=>empty': { toString: () => '' },
    };
    const msg = (k, expected, actual) => `${k}: Expected ${JSON.stringify(expected)} to be ${JSON.stringify(actual)}`;
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k] ? VALUES[k].toString() : VALUES[k];

      const required = parser({ required: true })(VALUES[k]);
      expect(required.value).toBe('required');
      expect(required.status).toBe('rejected');

      const notRequired = parser({ required: false })(VALUES[k]);
      expect(notRequired.value).toBe(expected, msg(k, expected, notRequired));
      expect(notRequired.status).toBe('resolved');
    });
  });

  it('should reject invalid values', () => {
    const VALUES = {
      '12345.6789': 12345.6789,
      '+12345.6789': 12345.6789,
      '-12345.6789': -12345.6789,
      '...': 'invalid',
      'Amount: $12,345.67': 12345.67,
      'Amount: $-12,345.67': -12345.67,
      'Amount: -$12,345.67': -12345.67,
      'Pi: +314e-2': 3.14,
      'o.O': 'invalid',
      '192.168.1.1': 192.168,
    };
    const msg = (k, expected, actual) => `${k}: Expected ${JSON.stringify(expected)} to be ${JSON.stringify(actual)}`;
    Object.keys(VALUES).forEach(k => {
      const actual = parser()(k);
      const expected = VALUES[k];
      expect(actual.value).toBe(expected, msg(k, expected, actual.value));
      expect(actual.status).toBe(expected === 'invalid' ? 'rejected' : 'resolved');
    });
  });

  it('should resolve/reject on min', () => {
    const VALUES = {
      '123': 'min',
      '124': 124,
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ min: 124 })(k);
      expect(actual.value).toBe(expected);
      expect(actual.status).toBe(expected === 'min' ? 'rejected' : 'resolved');
    });
  });

  it('should resolve/reject on max', () => {
    const VALUES = {
      '123': 123,
      '124': 'max',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ max: 123 })(k);
      expect(actual.value).toBe(expected);
      expect(actual.status).toBe(expected === 'max' ? 'rejected' : 'resolved');
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      '123': 123,
      '124': 'validate',
    };
    const onlyOdd = v => v % 2;
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ validate: onlyOdd })(k);
      expect(actual.value).toBe(expected);
      expect(actual.status).toBe(expected === 'validate' ? 'rejected' : 'resolved');
    });
  });
});
