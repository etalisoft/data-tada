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
      parser({ required: true })(VALUES[k]).value(state => {
        expect(state).toContain({
          status: 'rejected',
          value: 'Required',
        });
      });

      parser({ required: false })(VALUES[k]).value(state => {
        expect(state).toContain({
          status: 'resolved',
          value: { password: '' },
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
      aA$12345: { password: 'aA$12345' },
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
      aA$1234567: { password: 'aA$1234567' },
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

  it('should resolve/reject on minLower', () => {
    const VALUES = {
      'aaBBBB12!@': 'Too Few a-z',
      'aaaBBB12!@': { password: 'aaaBBB12!@' },
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ minLower: 3 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Few a-z' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on maxLower', () => {
    const VALUES = {
      'aaBBBB12!@': { password: 'aaBBBB12!@' },
      'aaaBBB12!@': 'Too Many a-z',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ maxLower: 2 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Many a-z' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on minUpper', () => {
    const VALUES = {
      'aaaaBB12!@': 'Too Few A-Z',
      'aaaBBB12!@': { password: 'aaaBBB12!@' },
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ minUpper: 3 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Few A-Z' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on maxUpper', () => {
    const VALUES = {
      'aaaaBB12!@': { password: 'aaaaBB12!@' },
      'aaaBBB12!@': 'Too Many A-Z',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ maxUpper: 2 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Many A-Z' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on minDigit', () => {
    const VALUES = {
      'aaaBBB12!@': 'Too Few 0-9',
      'aaBB1234!@': { password: 'aaBB1234!@' },
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ minDigit: 3 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Few 0-9' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on maxDigit', () => {
    const VALUES = {
      'aaaBBB12!@': { password: 'aaaBBB12!@' },
      'aaBB1234!@': 'Too Many 0-9',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ maxDigit: 2 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Many 0-9' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on minSymbol', () => {
    const VALUES = {
      'aaBB123!@': 'Too Few Symbols',
      'aaBB12!@#': { password: 'aaBB12!@#' },
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ minSymbol: 3 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Few Symbols' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on maxSymbol', () => {
    const VALUES = {
      'aaaBBB12!@': { password: 'aaaBBB12!@' },
      'aaBB12!@#$': 'Too Many Symbols',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ maxSymbol: 2 })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Too Many Symbols' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on minNonPrint', () => {
    parser({ minNonPrint: 3, maxNonPrint: Number.MAX_VALUE })('aaBB12!@\x1B\x1B').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });

    parser({ minNonPrint: 3, maxNonPrint: Number.MAX_VALUE })('aaBB12!@\x1B\x1B\x1B').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: { password: 'aaBB12!@\x1B\x1B\x1B' },
      });
    });
  });

  it('should resolve/reject on maxNonPrint', () => {
    parser({ maxNonPrint: 2 })('aaBB12!@\x1B\x1B\x1B').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });

    parser({ maxNonPrint: 2 })('aaBB12!@\x1B\x1B').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: { password: 'aaBB12!@\x1B\x1B' },
      });
    });
  });

  it('should resolve/reject on minAsciiExtended', () => {
    parser({ minAsciiExtended: 3, maxAsciiExtended: Number.MAX_VALUE })('aaBB12!@ññ').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });

    parser({ minAsciiExtended: 3, maxAsciiExtended: Number.MAX_VALUE })('aaBB12!@ñññ').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: { password: 'aaBB12!@ñññ' },
      });
    });
  });

  it('should resolve/reject on maxAsciiExtended', () => {
    parser({ maxAsciiExtended: 2 })('aaBB12!@ñññ').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });

    parser({ maxAsciiExtended: 2 })('aaBB12!@ññ').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: { password: 'aaBB12!@ññ' },
      });
    });
  });

  it('should resolve/reject on minUnicode', () => {
    parser({ minUnicode: 3, maxUnicode: Number.MAX_VALUE })('aaBB12!@\u03a0\u03a0').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });

    parser({ minUnicode: 3, maxUnicode: Number.MAX_VALUE })('aaBB12!@\u03a0\u03a0\u03a0').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: { password: 'aaBB12!@\u03a0\u03a0\u03a0' },
      });
    });
  });

  it('should resolve/reject on maxUnicode', () => {
    parser({ maxUnicode: 2 })('aaBB12!@\u03a0\u03a0\u03a0').value(state => {
      expect(state).toContain({
        status: 'rejected',
        value: 'Invalid',
      });
    });

    parser({ maxUnicode: 2 })('aaBB12!@\u03a0\u03a0').value(state => {
      expect(state).toContain({
        status: 'resolved',
        value: { password: 'aaBB12!@\u03a0\u03a0' },
      });
    });
  });

  it('should resolve/reject on regex', () => {
    const VALUES = {
      'abcABC123!@#': { password: 'abcABC123!@#' },
      'xyzABC123!@#': 'Invalid',
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ regex: /abc/ })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Invalid' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on notRegex', () => {
    const VALUES = {
      'abcABC123!@#': 'Invalid',
      'xyzABC123!@#': { password: 'xyzABC123!@#' },
    };
    Object.keys(VALUES).forEach(k => {
      const expected = VALUES[k];
      parser({ notRegex: /abc/ })(k).value(state => {
        expect(state).toContain({
          status: expected === 'Invalid' ? 'rejected' : 'resolved',
          value: expected,
        });
      });
    });
  });

  it('should resolve/reject on validate', () => {
    const VALUES = {
      'paST12!@': { password: 'paST12!@' },
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
    const plan = parser().then(s => s.password.toLowerCase());
    const promise = plan('abAB12!@').then(v => `${v}_`);
    expect(promise.value()).toBe('abab12!@_');
  });
});
