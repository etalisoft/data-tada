import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../email.js';

describe('Parse.email', () => {
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
    Object.keys(VALUES).forEach(k => {
      parser({ required: true })(VALUES[k]).value(({ status, value }) => {
        expect(value).toBe('Required');
        expect(status).toBe('rejected');
      });

      parser({ required: false })(VALUES[k]).value(({ status, value }) => {
        expect(value).toContain({ email: '', user: '', domain: undefined });
        expect(status).toBe('resolved');
      });
    });
  });

  it('should resolve/reject on minLength', () => {
    const VALUES = {
      'a@b.com': 'Too Short',
      'a2@b.com': 'a2@b.com',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ minLength: 8 })(k).value(({ status, value }) => {
        expect(status).toBe(expected === 'Too Short' ? 'rejected' : 'resolved');
        expect(expected === 'Too Short' ? value : value.email).toBe(expected);
      });
    });
  });

  it('should resolve/reject on maxLength', () => {
    const VALUES = {
      'a@b.com': 'a@b.com',
      'a2@b.com': 'Too Long',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ maxLength: 7 })(k).value(({ status, value }) => {
        expect(status).toBe(expected === 'Too Long' ? 'rejected' : 'resolved');
        expect(expected === 'Too Long' ? value : value.email).toBe(expected);
      });
    });
  });

  it('should resolve/reject on regex', () => {
    const defaultParser = parser();
    const customParser = parser({ regex: /^\w+@b\.com$/i });
    [defaultParser, customParser].forEach(p => {
      defaultParser('o.O').value(({ status, value }) => {
        expect(status).toBe('rejected');
        expect(value).toBe('Invalid');
      });

      p('a@b.com').value(({ status, value }) => {
        expect(status).toBe('resolved');
        expect(value.email).toBe('a@b.com');
      });

      if (p === customParser) {
        customParser('b@a.com').value(({ status, value }) => {
          expect(status).toBe('rejected');
          expect(value).toBe('Invalid');
        });
      }
    });
  });

  it('should resolve/reject on notRegex', () => {
    const VALUES = {
      'person@lol.com': 'person@lol.com',
      'person@aol.com': 'Invalid',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ notRegex: /@aol.com$/i })(k).value(({ status, value }) => {
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
        expect(expected === 'Invalid' ? value : value.email).toBe(expected);
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      'a@b.com': 'a@b.com',
      'a@B.com': 'Invalid',
    };
    const onlyLowerCase = v => v === v.toLowerCase();
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ validate: onlyLowerCase })(k).value(({ status, value }) => {
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
        expect(expected === 'Invalid' ? value : value.email).toBe(expected);
      });
    });
  });

  it('should support execution plan then/catch chains before parsing values', () => {
    const plan = parser().then(({ user }) => user.toUpperCase());
    const promise = plan('john@doe.com').then(v => `USER=${v}`);
    expect(promise.value()).toBe('USER=JOHN');
  });
});
