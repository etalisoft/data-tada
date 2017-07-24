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

      const required = parser({ required: false })(VALUES[k]);
      expect(required.value).toBe(expected, msg(k, expected, required));
      expect(required.status).toBe('resolved');

      const notRequired = parser({ required: false })(VALUES[k]);
      expect(notRequired.value).toBe(expected, msg(k, expected, notRequired));
      expect(notRequired.status).toBe('resolved');
    });
  });

  it('should resolve/reject on minLength', () => {
    const VALUES = {
      'a@b.com': 'minLength',
      'a2@b.com': 'a2@b.com',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ minLength: 8 })(k);
      expect(actual.status).toBe(expected === 'minLength' ? 'rejected' : 'resolved');
      expect(expected === 'minLength' ? actual.value : actual.value.email).toBe(expected);
    });
  });

  it('should resolve/reject on maxLength', () => {
    const VALUES = {
      'a@b.com': 'a@b.com',
      'a2@b.com': 'maxLength',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      const actual = parser({ maxLength: 7 })(k);
      expect(actual.status).toBe(expected === 'maxLength' ? 'rejected' : 'resolved');
      expect(expected === 'maxLength' ? actual.value : actual.value.email).toBe(expected);
    });
  });

  it('should resolve/reject on regex', () => {
    const defaultParser = parser();
    const customParser = parser({ regex: /^\w+@b\.com$/i });
    [defaultParser, customParser].forEach(p => {
      const bad = defaultParser('o.O');
      expect(bad.status).toBe('rejected');
      expect(bad.value).toBe('regex');

      const valid = p('a@b.com');
      expect(valid.status).toBe('resolved');
      expect(valid.value.email).toBe('a@b.com');

      if (p === customParser) {
        const invalid = customParser('b@a.com');
        expect(invalid.status).toBe('rejected');
        expect(invalid.value).toBe('regex');
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
      const actual = parser({ notRegex: /@aol.com$/i })(k);
      expect(actual.status).toBe(expected === 'notRegex' ? 'rejected' : 'resolved');
      expect(expected === 'notRegex' ? actual.value : actual.value.email).toBe(expected);
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
      const actual = parser({ validate: onlyLowerCase })(k);
      expect(actual.status).toBe(expected === 'validate' ? 'rejected' : 'resolved');
      expect(expected === 'validate' ? actual.value : actual.value.email).toBe(expected);
    });
  });
});
