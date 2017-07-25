import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../date.js';

const falsy = [null, undefined, false, 0, NaN, ''];

describe('parser.date', () => {
  let warn;

  before(() => {
    warn = console.warn;
    console.warn = () => {};
  });

  after(() => {
    console.warn = warn;
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
    const keys = 'moment,date,D,DD,ddd,dddd,S,SS,SSS,SSSS,h,hh,H,HH,m,mm,M,MM,MMM,MMMM,A,YY,YYYY,Z'.split(',');
    falsy.forEach(value => {
      parser({ required: false })(value).value(({ status, value }) => {
        if (!value) console.log('UH OH', value, value);
        expect(value).toExist().toIncludeKeys(keys);
        expect(status).toBe('resolved');
      });

      parser({ required: true })(value).value(({ status, value }) => {
        expect(value).toBe('required');
        expect(status).toBe('rejected');
      })
    });
  });

  it('should reject on invalid', () => {
    ['now', 'today', '2000-01-01', new Date(), { year: 2000 }, [2000]].forEach(value => {
      parser({ required: true })(value).value(({ status, value }) => {
        expect(status).toBe('resolved');
        expect(value.moment.isValid()).toBe(true);
      })
    });
    ['o.O'].forEach(value => {
      parser({ required: true })(value).value(({ status, value }) => {
        expect(status).toBe('rejected');
        expect(value).toBe('invalid');
      });
    });
  });

  it('should resolve/reject on min', () => {
    const VALUES = {
      '2000-01-01 12:29:00': 'min',
      '2000-01-01 12:30:00': true,
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ min: '2000-01-01 12:29:30' })(k).value(({ status, value }) => {
        expect(status).toBe(expected === 'min' ? 'rejected' : 'resolved');
        if (expected === 'min') {
          expect(value).toBe('min');
        } else {
          expect(value.moment.format('M/D/YYYY')).toBe('1/1/2000');
        }
      });
    });
  });

  it('should reject if an invalid min is specified', () => {
    [
      ...falsy,
      'now',
      'today',
      '2000-01-01 12:30:00',
      new Date(),
      () => new Date(),
      { year: 2000 },
      [2000],
    ].forEach(min => {
      parser({ min })(Date.now() + 1000).value(({ status, value }) => {
        expect(status).toBe('resolved', value);
        expect(value.moment.isValid()).toBe(true);
      })
    });
    ['o.O'].forEach(min => {
      parser({ min })(Date.now() + 1000).value(({ status, value }) => {
        expect(status).toBe('rejected');
        expect(value).toBe('invalidMin');
      })
    });
  });

  it('should resolve/reject on max', () => {
    const VALUES = {
      '2000-01-01 12:29:00': true,
      '2000-01-01 12:30:00': 'max',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ max: '2000-01-01 12:29:00' })(k).value(({ status, value }) => {
        expect(status).toBe(expected === 'max' ? 'rejected' : 'resolved');
        if (expected === 'max') {
          expect(value).toBe('max');
        } else {
          expect(value.moment.format('M/D/YYYY')).toBe('1/1/2000');
        }
      });
    });
  });

  it('should reject if an invalid max is specified', () => {
    [
      ...falsy,
      'now',
      'today',
      '2000-01-01 12:30:00',
      new Date(),
      () => new Date(),
      { year: 2000 },
      [2000],
    ].forEach(max => {
      parser({ max })('1969-12-31 12:00:00').value(({ status, value }) => {
        expect(status).toBe('resolved');
        expect(value.moment.isValid()).toBe(true);
      })
    });
    ['o.O'].forEach(max => {
      parser({ max })('1969-12-31 12:00:00').value(({ status, value }) => {
        expect(status).toBe('rejected');
        expect(value).toBe('invalidMax');
      })
    });
  });

  it('should resolve/reject on validate', () => {
    const TESTS = {
      '1/1/2000': () => true,
      validate: () => false,
    };
    Object.keys(TESTS).forEach(k => {
      parser({ validate: TESTS[k] })('2000-01-01').value(({ status, value }) => {
        expect(status).toBe(k === 'validate' ? 'rejected' : 'resolved');
        if (k === 'validate') {
          expect(value).toBe('validate');
        } else {
          expect(value.moment.format('M/D/YYYY')).toBe('1/1/2000');
        }
      })
    });
  });
});
