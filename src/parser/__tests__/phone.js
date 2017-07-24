import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../phone.js';

describe('parser.string', () => {
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
      const actual = parser()(k);
      if (expected === 'invalid') {
        expect(actual.value).toBe('invalid');
      } else {
        expect(actual.value).toIncludeKeys(keys);
        expect(actual.value.phone).toBe(expected);
      }
      expect(actual.status).toBe(expected === 'invalid' ? 'rejected' : 'resolved');
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
      const actual = parser({ validate: not800Number })(k);
      expect(expected === 'validate' ? actual.value : actual.value.phone).toBe(expected);
      expect(actual.status).toBe(expected === 'validate' ? 'rejected' : 'resolved');
    });
  });
});
