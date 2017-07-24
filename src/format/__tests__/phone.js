import expect from 'expect';

import format from '../phone';

describe('format.phone', () => {
  it('should format for named types', () => {
    const FORMATS = {
      '(800) 555-1212': { phone: '(800) 555-1212' },
    };
    Object.keys(FORMATS).forEach(k => {
      expect(format.default(FORMATS[k])).toBe(k);
    });
  });
});
