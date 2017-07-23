import expect from 'expect';

import format from '../zip';

describe('format.zip', () => {
  it('should format for named types', () => {
    expect(format.default({ zip: '12345', zipPlus4: '12345' })).toBe('12345');
    expect(format.default({ zip: '12345', zipPlus4: '12345-6789' })).toBe('12345-6789');
    expect(format.zip({ zip: '54321', zipPlus4: '54321-6789' })).toBe('54321');
  });
});
