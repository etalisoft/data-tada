import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../username';

describe('Parse.username', () => {
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
      a12: 'Too Short',
      a123: 'a123',
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
  });

  it('should resolve/reject on maxLength', () => {
    const VALUES = {
      a123456789: 'a123456789',
      a1234567890: 'Too Long',
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
      username: 'username',
      '1username': 'Invalid',
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
      user1: 'user1',
      user0: 'Invalid',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ notRegex: /^user0$/ })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Invalid' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      abcd: 'abcd',
      Abcd: 'Invalid',
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
  });

  it('should support execution plan then/catch chains before parsing values', () => {
    const plan = parser().then(s => s.toLowerCase());
    const promise = plan('USER').then(v => `${v}name`);
    expect(promise.value()).toBe('username');
  });
});
