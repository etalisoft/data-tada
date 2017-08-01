import expect from 'expect';

import format from '../email';

describe('Format.email', () => {
  it('should create new', () => {
    const valid = format.new('john@doe.com');
    expect(valid).toContain({
      email: 'john@doe.com',
      user: 'john',
      domain: 'doe.com',
    });

    const invalid = format.new(new Date());
    expect(invalid).toContain({
      email: '',
      user: '',
      domain: undefined,
    });
  });

  it('should format for named types', () => {
    const email = format.new('john@doe.com');
    expect(format.email(email)).toBe('john@doe.com');
    expect(format.mask(email)).toBe('****@doe.com');
    expect(format.maskWith()(email)).toBe('****@doe.com');
    expect(format.maskWith('_')(email)).toBe('____@doe.com');
  });
});
