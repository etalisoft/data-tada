import expect from 'expect';

import format from '../email';

describe('format.email', () => {
  it('should format for named types', () => {
    const value = { email: 'john@doe.com', user: 'john', domain: 'doe.com' };
    expect(format.default(value)).toBe('john@doe.com');
    expect(format.mask(value)).toBe('****@doe.com');
    expect(format.maskWith()(value)).toBe('****@doe.com');
    expect(format.maskWith('_')(value)).toBe('____@doe.com');
  });
});
