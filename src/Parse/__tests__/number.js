import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../number';

describe('Parse.number', () => {
  it('should expose defaults', () => {
    const keys = 'model,required,min,max,validate,messages,parse'.split(',');
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
    const msg = (k, expected, actual) => `${k}: Expected ${JSON.stringify(expected)} to be ${JSON.stringify(actual)}`;
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k] ? VALUES[k].toString() : VALUES[k];

      parser({ required: true })(VALUES[k]).value(({ status, value }) => {
        expect(value).toBe('Required');
        expect(status).toBe('rejected');
      });

      parser({ required: false })(VALUES[k]).value(({ status, value }) => {
        expect(isNaN(value)).toBe(true, msg(k, expected, value));
        expect(status).toBe('resolved');
      });
    });
  });

  it('should reject invalid values', () => {
    const VALUES = {
      '12345.6789': 12345.6789,
      '+12345.6789': 12345.6789,
      '-12345.6789': -12345.6789,
      '...': 'Invalid',
      'Amount: $12,345.67': 12345.67,
      'Amount: $-12,345.67': -12345.67,
      'Amount: -$12,345.67': -12345.67,
      'Pi: +314e-2': 3.14,
      'o.O': 'Invalid',
      '192.168.1.1': 192.168,
    };
    const msg = (k, expected, actual) => `${k}: Expected ${JSON.stringify(expected)} to be ${JSON.stringify(actual)}`;
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser()(k).value(({ status, value }) => {
        expect(value).toBe(expected, msg(k, expected, value));
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on min', () => {
    const VALUES = {
      '123': 'Too Low',
      '124': 124,
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ min: 124 })(k).value(({ status, value }) => {
        expect(value).toBe(expected);
        expect(status).toBe(expected === 'Too Low' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on max', () => {
    const VALUES = {
      '123': 123,
      '124': 'Too High',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ max: 123 })(k).value(({ status, value }) => {
        expect(value).toBe(expected);
        expect(status).toBe(expected === 'Too High' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      '123': 123,
      '124': 'Invalid',
    };
    const onlyOdd = v => v % 2;
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ validate: onlyOdd })(k).value(({ status, value }) => {
        expect(value).toBe(expected);
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should support execution plan then/catch chains before parsing values', () => {
    const plan = parser().then(v => Math.abs(v)).then(v => v * 2);
    const promise = plan('-123').then(v => `#=${v}`);
    expect(promise.value()).toBe('#=246');
  });
});
