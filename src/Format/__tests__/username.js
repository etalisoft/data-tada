import expect from 'expect';

import format from '../username';

describe('Format.username', () => {
  it('should create new', () => {
    expect(format.new('valid')).toBe('valid');
  });
});
