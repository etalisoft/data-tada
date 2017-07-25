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

  it('should resolve/reject on minLength', () => {
    const VALUES = {
      '123': 'minLength',
      '1234': '1234',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ minLength: 4 })(k).value(({ status, value }) => {
        expect(value).toBe(expected);
        expect(status).toBe(expected === 'minLength' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on maxLength', () => {
    const VALUES = {
      '123': '123',
      '1234': 'maxLength',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ maxLength: 3 })(k).value(({ status, value }) => {
        expect(value).toBe(expected);
        expect(status).toBe(expected === 'maxLength' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on regex', () => {
    const VALUES = {
      valid: 'valid',
      invalid: 'regex',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ regex: /^valid$/ })(k).value(({ status, value }) => {
        expect(value).toBe(expected);
        expect(status).toBe(expected === 'regex' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on notRegex', () => {
    const VALUES = {
      valid: 'valid',
      invalid: 'notRegex',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ notRegex: /^invalid$/ })(k).value(({ status, value }) => {
        expect(value).toBe(expected);
        expect(status).toBe(expected === 'notRegex' ? 'rejected' : 'resolved');
      });
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
      parser({ validate: onlyLowerCase })(k).value(({ status, value }) => {
        expect(value).toBe(expected);
        expect(status).toBe(expected === 'validate' ? 'rejected' : 'resolved');
      });
    });
  });
});
