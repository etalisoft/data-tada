import expect from 'expect';

import format from '../password';

describe('Format.password', () => {
  it('should create new', () => {
    expect(format.new('valid')).toBe('valid');
  });

  it('should format for named types', () => {
    const password = format.new('password');
    expect(format.mask(password)).toBe('********');
    expect(format.maskWith()(password)).toBe('********');
    expect(format.maskWith('_')(password)).toBe('________');
  });
});
