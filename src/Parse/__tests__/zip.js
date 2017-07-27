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

      parser({ required: true })(VALUES[k]).value(({ status, value }) => {
        expect(value).toBe('Required');
        expect(status).toBe('rejected');
      });

      parser({ required: false })(VALUES[k]).value(({ status, value }) => {
        expect(value).toBe(expected, msg(k, expected, value));
        expect(status).toBe('resolved');
      });
    });
  });

  it('should reject on invalid', () => {
    const VALUES = {
      '1234': 'Invalid',
      '12345': '12345',
      '12345678': 'Invalid',
      '123456789': '12345-6789',
      '1234567890': 'Invalid',
    };
    const keys = 'zip,plus4,zipPlus4'.split(',');
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser()(k).value(({ status, value }) => {
        if (expected === 'Invalid') {
          expect(value).toBe('Invalid', k);
        } else {
          expect(value).toIncludeKeys(keys);
          expect(value.zipPlus4).toBe(expected);
        }
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      '12345': '12345',
      '12346': 'Invalid',
    };
    const notOdd = ({ zip }) => parseInt(zip, 10) % 2;
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ validate: notOdd })(k).value(({ status, value }) => {
        expect(expected === 'Invalid' ? value : value.zip).toBe(expected);
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
      });
    });
  });
});
