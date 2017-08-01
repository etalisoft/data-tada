import expect from 'expect';

import format from '../phone';

describe('Format.phone', () => {
  it('should create new', () => {
    const valid = format.new({
      phone: 'a',
      areaCode: 'b',
      local3: 'c',
      last4: 'd',
      extension: 'e',
    });
    expect(valid).toContain({
      phone: 'a',
      areaCode: 'b',
      local3: 'c',
      last4: 'd',
      extension: 'e',
    });

    const invalid = format.new(new Date());
    expect(invalid).toContain({
      phone: undefined,
      areaCode: undefined,
      local3: undefined,
      last4: undefined,
      extension: undefined,
    });
  });

  it('should format for named types', () => {
    const value = { phone: '(800) 555-1212', areaCode: '800', local3: '555', last4: '1212', extension: null };
    expect(format.phone(value)).toBe('(800) 555-1212');
    expect(format.localOnly(value)).toBe('555-1212');
  });
});
