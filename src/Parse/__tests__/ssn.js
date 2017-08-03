import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../ssn';

describe('Parse.ssn', () => {
  it('should expose defaults', () => {
    const keys = 'model,required,validate,messages,parse'.split(',');
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

      parser({ required: true })(VALUES[k]).value(({ status, value }) => {
        expect(value).toBe('Required');
        expect(status).toBe('rejected');
      });

      parser({ required: false })(VALUES[k]).value(({ status, value }) => {
        expect(value).toContain({ ssn: undefined, first3: undefined, middle2: undefined, last4: undefined });
        expect(status).toBe('resolved');
      });
    });
  });

  it('should reject on invalid', () => {
    const VALUES = {
      '12345678': 'Invalid',
      '123456789': '123-45-6789',
      '|123|12|1234|': '123-12-1234',
      '1234567890': 'Invalid',
    };
    const keys = 'ssn,first3,middle2,last4'.split(',');
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser()(k).value(({ status, value }) => {
        if (expected === 'Invalid') {
          expect(value).toBe('Invalid');
        } else {
          expect(value).toIncludeKeys(keys);
          expect(value.ssn).toBe(expected);
        }
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      '666-45-6789': 'Invalid',
      '123-45-6789': '123-45-6789',
    };
    const not666 = ({ first3 }) => first3 !== '666';
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ validate: not666 })(k).value(({ status, value }) => {
        expect(expected === 'Invalid' ? value : value.ssn).toBe(expected);
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should support execution plan then/catch chains before parsing values', () => {
    const plan = parser().then(({ last4 }) => last4 * 2);
    const promise = plan('987654321').then(v => `2*Last4=${v}`);
    expect(promise.value()).toBe('2*Last4=8642');
  });
});
