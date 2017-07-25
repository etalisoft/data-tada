import expect from 'expect';

import format from '../ssn';

describe('format.ssn', () => {
  it('should format for named types', () => {
    const value = { ssn: '123-45-6789', first3: '123', middle2: '45', last4: '6789' };
    expect(format.default(value)).toBe('123-45-6789');
    expect(format.last4(value)).toBe('6789');
    expect(format.mask(value)).toBe('***-**-6789');
    expect(format.maskWith()(value)).toBe('***-**-6789');
    expect(format.maskWith('_')(value)).toBe('___-__-6789');
  });
});
