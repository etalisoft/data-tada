import expect from 'expect';

import format from '../username';

describe('Format.username', () => {
  it('should create new', () => {
    expect(format.new('valid')).toBe('valid');
  });

  it('should format for named types', () => {
    const username = format.new('username');
    expect(format.mask(username)).toBe('us****me');
    expect(format.maskWith()(username)).toBe('us****me');
    expect(format.maskWith('_')(username)).toBe('us____me');
  });
});
