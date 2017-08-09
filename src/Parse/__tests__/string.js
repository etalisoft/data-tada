import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../string';

describe('Parse.string', () => {
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

    parser({ required: true, trim: true })(' ').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Required',
      });
    });

    parser({ required: false, trim: true })(' ').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: '',
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
      '123': 'Too Short',
      '1234': '1234',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ minLength: 4 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Short' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });

    parser({ trim: true, minLength: 4 })(' abc').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Too Short',
      });
    });

    parser({ trim: false, minLength: 4 })(' abc').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: ' abc',
      });
    });
  });

  it('should resolve/reject on maxLength', () => {
    const VALUES = {
      '123': '123',
      '1234': 'Too Long',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ maxLength: 3 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Long' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });

    parser({ trim: true, maxLength: 3 })(' abc').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: 'abc',
      });
    });

    parser({ trim: false, maxLength: 3 })(' abc').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Too Long',
      });
    });
  });

  it('should resolve/reject on regex', () => {
    const VALUES = {
      valid: 'valid',
      invalid: 'Invalid',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ regex: /^valid$/ })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Invalid' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });

    parser({ trim: true, regex: /^valid$/ })(' valid').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: 'valid',
      });
    });

    parser({ trim: false, regex: /^valid$/ })(' valid').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });
  });

  it('should resolve/reject on notRegex', () => {
    const VALUES = {
      valid: 'valid',
      invalid: 'Invalid',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ notRegex: /^invalid$/ })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Invalid' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });

    parser({ trim: true, notRegex: /^invalid$/ })(' invalid').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });

    parser({ trim: false, notRegex: /^invalid$/ })(' invalid').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: ' invalid',
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      abc: 'abc',
      aBc: 'Invalid',
    };
    const onlyLowerCase = v => v === v.toLowerCase();
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ validate: onlyLowerCase })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Invalid' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });

    const noSpaces = v => !v.includes(' ');
    parser({ trim: true, validate: noSpaces })(' ').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: '',
      });
    });

    parser({ trim: false, validate: noSpaces })(' ').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });
  });

  it('should support execution plan then/catch chains before parsing values', () => {
    const plan = parser().then(s => s.trim().toLowerCase());
    const promise = plan('  O.  ').then(v => `${v}O`);
    expect(promise.value()).toBe('o.O');
  });
});
