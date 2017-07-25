import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../phone.js';

describe('parser.phone', () => {
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
        expect(value).toBe('required');
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
      '1234567': '123-4567',
      '12345678': 'invalid',
      '8001234567': '(800) 123-4567',
      '18001234567': '(800) 123-4567',
      '28001234567': 'invalid',
      'Work: 123-4567 extension 9876': '123-4567 ext. 9876',
      '800-555-1212[x123]': '(800) 555-1212 ext. 123',
      'o.O': 'invalid',
    };
    const keys = 'areaCode,local3,last4,extension'.split(',');
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser()(k).value(({ status, value }) => {
        if (expected === 'invalid') {
          expect(value).toBe('invalid');
        } else {
          expect(value).toIncludeKeys(keys);
          expect(value.phone).toBe(expected);
        }
        expect(status).toBe(expected === 'invalid' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      '123-456-6789': '(123) 456-6789',
      '800-456-6789': 'validate',
    };
    const not800Number = ({ areaCode }) => areaCode !== '800';
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ validate: not800Number })(k).value(({ status, value }) => {
        expect(expected === 'validate' ? value : value.phone).toBe(expected);
        expect(status).toBe(expected === 'validate' ? 'rejected' : 'resolved');
      });
    });
  });
});
