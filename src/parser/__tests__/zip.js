import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../zip.js';

describe('parser.zip', () => {
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
      '1234': 'invalid',
      '12345': '12345',
      '12345678': 'invalid',
      '123456789': '12345-6789',
      '1234567890': 'invalid',
    };
    const keys = 'zip,plus4,zipPlus4'.split(',');
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser()(k);
      if (expected === 'invalid') {
        expect(actual.value).toBe('invalid', k);
      } else {
        expect(actual.value).toIncludeKeys(keys);
        expect(actual.value.zipPlus4).toBe(expected);
      }
      expect(actual.status).toBe(expected === 'invalid' ? 'rejected' : 'resolved');
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      '12345': '12345',
      '12346': 'validate',
    };
    const notOdd = ({ zip }) => parseInt(zip, 10) % 2;
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ validate: notOdd })(k);
      expect(expected === 'validate' ? actual.value : actual.value.zip).toBe(expected);
      expect(actual.status).toBe(expected === 'validate' ? 'rejected' : 'resolved');
    });
  });
});
