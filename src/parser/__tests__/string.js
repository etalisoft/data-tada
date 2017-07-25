import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../string.js';

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

      const required = parser({ required: true })(VALUES[k]);
      expect(required.value).toBe('required');
      expect(required.status).toBe('rejected');

      const notRequired = parser({ required: false })(VALUES[k]);
      expect(notRequired.value).toBe(expected, msg(k, expected, notRequired));
      expect(notRequired.status).toBe('resolved');
    });
  });

  it('should resolve/reject on minLength', () => {
    const VALUES = {
      '123': 'minLength',
      '1234': '1234',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ minLength: 4 })(k);
      expect(actual.value).toBe(expected);
      expect(actual.status).toBe(expected === 'minLength' ? 'rejected' : 'resolved');
    });
  });

  it('should resolve/reject on maxLength', () => {
    const VALUES = {
      '123': '123',
      '1234': 'maxLength',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ maxLength: 3 })(k);
      expect(actual.value).toBe(expected);
      expect(actual.status).toBe(expected === 'maxLength' ? 'rejected' : 'resolved');
    });
  });

  it('should resolve/reject on regex', () => {
    const VALUES = {
      valid: 'valid',
      invalid: 'regex',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ regex: /^valid$/ })(k);
      expect(actual.value).toBe(expected);
      expect(actual.status).toBe(expected === 'regex' ? 'rejected' : 'resolved');
    });
  });

  it('should resolve/reject on notRegex', () => {
    const VALUES = {
      valid: 'valid',
      invalid: 'notRegex',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ notRegex: /^invalid$/ })(k);
      expect(actual.value).toBe(expected);
      expect(actual.status).toBe(expected === 'notRegex' ? 'rejected' : 'resolved');
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      abc: 'abc',
      aBc: 'validate',
    };
    const onlyLowerCase = v => v === v.toLowerCase();
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ validate: onlyLowerCase })(k);
      expect(actual.value).toBe(expected);
      expect(actual.status).toBe(expected === 'validate' ? 'rejected' : 'resolved');
    });
  });
});
