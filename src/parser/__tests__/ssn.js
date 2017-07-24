import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../ssn.js';

describe('parser.ssn', () => {
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

      const required = parser({ required: false })(VALUES[k]);
      expect(required.value).toBe(expected, msg(k, expected, required));
      expect(required.status).toBe('resolved');

      const notRequired = parser({ required: false })(VALUES[k]);
      expect(notRequired.value).toBe(expected, msg(k, expected, notRequired));
      expect(notRequired.status).toBe('resolved');
    });
  });

  it('should reject on invalid', () => {
    const VALUES = {
      '12345678': 'invalid',
      '123456789': '123-45-6789',
      '|123|12|1234|': '123-12-1234',
      '1234567890': 'invalid',
    };
    const keys = 'ssn,first3,middle2,last4'.split(',');
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser()(k);
      if (expected === 'invalid') {
        expect(actual.value).toBe('invalid');
      } else {
        expect(actual.value).toIncludeKeys(keys);
        expect(actual.value.ssn).toBe(expected);
      }
      expect(actual.status).toBe(expected === 'invalid' ? 'rejected' : 'resolved');
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      '666-45-6789': 'validate',
      '123-45-6789': '123-45-6789',
    };
    const not666 = ({ first3 }) => first3 !== '666';
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ validate: not666 })(k);
      expect(expected === 'validate' ? actual.value : actual.value.ssn).toBe(expected);
      expect(actual.status).toBe(expected === 'validate' ? 'rejected' : 'resolved');
    });
  });
});
