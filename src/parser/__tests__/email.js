import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../email.js';

describe('parser.email', () => {
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
      'a@b.com': 'minLength',
      'a2@b.com': 'a2@b.com',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ minLength: 8 })(k).value(({ status, value }) => {
        expect(status).toBe(expected === 'minLength' ? 'rejected' : 'resolved');
        expect(expected === 'minLength' ? value : value.email).toBe(expected);
      });
    });
  });

  it('should resolve/reject on maxLength', () => {
    const VALUES = {
      'a@b.com': 'a@b.com',
      'a2@b.com': 'maxLength',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ maxLength: 7 })(k).value(({ status, value }) => {
        expect(status).toBe(expected === 'maxLength' ? 'rejected' : 'resolved');
        expect(expected === 'maxLength' ? value : value.email).toBe(expected);
      });
    });
  });

  it('should resolve/reject on regex', () => {
    const defaultParser = parser();
    const customParser = parser({ regex: /^\w+@b\.com$/i });
    [defaultParser, customParser].forEach(p => {
      defaultParser('o.O').value(({ status, value }) => {
        expect(status).toBe('rejected');
        expect(value).toBe('regex');
      });

      p('a@b.com').value(({ status, value }) => {
        expect(status).toBe('resolved');
        expect(value.email).toBe('a@b.com');
      });

      if (p === customParser) {
        customParser('b@a.com').value(({ status, value }) => {
          expect(status).toBe('rejected');
          expect(value).toBe('regex');
        });
      }
    });
  });

  it('should resolve/reject on notRegex', () => {
    const VALUES = {
      'person@lol.com': 'person@lol.com',
      'person@aol.com': 'notRegex',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ notRegex: /@aol.com$/i })(k).value(({ status, value}) => {
        expect(status).toBe(expected === 'notRegex' ? 'rejected' : 'resolved');
        expect(expected === 'notRegex' ? value : value.email).toBe(expected);
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      'a@b.com': 'a@b.com',
      'a@B.com': 'validate',
    };
    const onlyLowerCase = v => v === v.toLowerCase();
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ validate: onlyLowerCase })(k).value(({ status, value }) => {
        expect(status).toBe(expected === 'validate' ? 'rejected' : 'resolved');
        expect(expected === 'validate' ? value : value.email).toBe(expected);
      });
    });
  });
});
