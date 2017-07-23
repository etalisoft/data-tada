import expect from 'expect';

import format from '../phone';

describe('format.phone', () => {
  it('should format for named types', () => {
    const FORMATS = {
      '800-555-1212': { areaCode: '800', parts: ['800', '555', '1212'] },
      '(123) 456-7890': { areaCode: '123', parts: ['123', '456', '7890'] },
    };
    Object.keys(FORMATS).forEach(k => {
      expect(format.default(FORMATS[k])).toBe(k);
    });
  });
});
