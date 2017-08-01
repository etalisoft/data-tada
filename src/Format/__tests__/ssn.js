import expect from 'expect';

import format from '../ssn';

describe('Format.ssn', () => {
  it('should create new', () => {
    const valid = format.new({
      ssn: 'a',
      first3: 'b',
      middle2: 'c',
      last4: 'd',
    });
    expect(valid).toContain({
      ssn: 'a',
      first3: 'b',
      middle2: 'c',
      last4: 'd',
    });

    const invalid = format.new(new Date());
    expect(invalid).toContain({
      ssn: undefined,
      first3: undefined,
      middle2: undefined,
      last4: undefined,
    });
  });

  it('should format for named types', () => {
    const value = { ssn: '123-45-6789', first3: '123', middle2: '45', last4: '6789' };
    expect(format.ssn(value)).toBe('123-45-6789');
    expect(format.last4(value)).toBe('6789');
    expect(format.mask(value)).toBe('***-**-6789');
    expect(format.maskWith()(value)).toBe('***-**-6789');
    expect(format.maskWith('_')(value)).toBe('___-__-6789');
  });
});
