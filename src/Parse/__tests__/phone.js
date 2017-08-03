import expect from 'expect';

import SyncPromise from '../../SyncPromise';
import parser from '../phone';

describe('Parse.phone', () => {
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
      parser({ required: true })(VALUES[k]).value(({ status, value }) => {
        expect(value).toBe('Required');
        expect(status).toBe('rejected');
      });

      parser({ required: false })(VALUES[k]).value(({ status, value }) => {
        expect(value).toContain({
          phone: undefined,
          areaCode: undefined,
          local3: undefined,
          last4: undefined,
          extension: undefined,
        });
        expect(status).toBe('resolved');
      });
    });
  });

  it('should reject on invalid', () => {
    const VALUES = {
      '1234567': '123-4567',
      '12345678': 'Invalid',
      '8001234567': '(800) 123-4567',
      '18001234567': '(800) 123-4567',
      '28001234567': 'Invalid',
      'Work: 123-4567 extension 9876': '123-4567 ext. 9876',
      '800-555-1212[x123]': '(800) 555-1212 ext. 123',
      'o.O': 'Invalid',
    };
    const keys = 'areaCode,local3,last4,extension'.split(',');
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser()(k).value(({ status, value }) => {
        if (expected === 'Invalid') {
          expect(value).toBe('Invalid');
        } else {
          expect(value).toIncludeKeys(keys);
          expect(value.phone).toBe(expected);
        }
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      '123-456-6789': '(123) 456-6789',
      '800-456-6789': 'Invalid',
    };
    const not800Number = ({ areaCode }) => areaCode !== '800';
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ validate: not800Number })(k).value(({ status, value }) => {
        expect(expected === 'Invalid' ? value : value.phone).toBe(expected);
        expect(status).toBe(expected === 'Invalid' ? 'rejected' : 'resolved');
      });
    });
  });

  it('should support execution plan then/catch chains before parsing values', () => {
    const plan = parser().then(phone => ({ ...phone, areaCode: '123', phone: `(123) ${phone.phone}` }));
    const promise = plan('555-1212').then(({ phone }) => `Phone=${phone}`);
    expect(promise.value()).toBe('Phone=(123) 555-1212');
  });
});
