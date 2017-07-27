import expect from 'expect';

import format from '../phone';

describe('format.phone', () => {
  it('should format for named types', () => {
    const value = { phone: '(800) 555-1212', areaCode: '800', local3: '555', last4: '1212', extension: null };
    expect(format.default(value)).toBe('(800) 555-1212');
    expect(format.localOnly(value)).toBe('555-1212');
  });
});
