import expect from 'expect';

import format from '../email';

describe('format.email', () => {
  it('should format for named types', () => {
    const email = 'john@doe.com';
    expect(format.default({ email })).toBe(email);
  });
});
