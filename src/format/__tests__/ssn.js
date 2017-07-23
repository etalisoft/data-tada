import expect from 'expect';

import format from '../ssn';

describe('format.ssn', () => {
  it('should format for named types', () => {
    expect(format.default({ ssn: '123-45-6789' })).toBe('123-45-6789');
  });
});
