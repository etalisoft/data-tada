import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../password';

describe('Parse.password', () => {
  it('should expose defaults', () => {
    const keys = 'model,required,minLength,maxLength,regex,notRegex,validate,messages,parse'.split(',');
    expect(parser.defaults).toExist().toIncludeKeys(keys);
  });

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
      const expected = VALUES[k] ? VALUES[k].toString() : VALUES[k];

      parser({ required: true })(VALUES[k]).value(state => {
        expect(state).toContain({
          status: 'rejected',
          value: 'Required',
        });
      });

      parser({ required: false })(VALUES[k]).value(state => {
        expect(state).toContain({
          status: 'resolved',
          value: expected || '',
        });
      });
    });
  });

  it('should resolve/reject on invalid', () => {
    parser({ parse: () => undefined })('abc').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });
  });

  it('should resolve/reject on minLength', () => {
    const VALUES = {
      aA$1234: 'Too Short',
      aA$12345: 'aA$12345',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ minLength: 8 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Short' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on maxLength', () => {
    const VALUES = {
      aA$1234567: 'aA$1234567',
      aA$12345678: 'Too Long',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ maxLength: 10 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Long' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on regex', () => {
    const VALUES = {
      lowerabc: 'Invalid',
      UPPERABC: 'Invalid',
      '12345678': 'Invalid',
      '!@#$%^&*': 'Invalid',
      'abAB12!@': 'abAB12!@',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser()(k).value(state => {
        expect(state).toContain({
          status: expected === 'Invalid' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on notRegex', () => {
    const VALUES = {
      'abAB12!@': 'abAB12!@',
      'baBA21@!': 'Invalid',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ notRegex: /21/ })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Invalid' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      'paST12!@': 'paST12!@',
      'paSS12!@': 'Invalid',
    };
    const noPass = v => !v.toLowerCase().includes('pass');
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ validate: noPass })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Invalid' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should support execution plan then/catch chains before parsing values', () => {
    const plan = parser().then(s => s.toLowerCase());
    const promise = plan('abAB12!@').then(v => `${v}_`);
    expect(promise.value()).toBe('abab12!@_');
  });
});
