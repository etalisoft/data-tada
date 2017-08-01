import expect from 'expect';

import format from '../zip';

describe('Format.zip', () => {
  it('should create new', () => {
    const valid = { zip: 'a', plus4: 'b', zipPlus4: 'c' };
    expect(format.new(valid)).toContain(valid);

    expect(format.new(new Date())).toContain({
      zip: undefined,
      plus4: undefined,
      zipPlus4: undefined,
    });
  });

  it('should format for named types', () => {
    expect(format.zip({ zip: 'a', plus4: 'b', zipPlus4: 'c' })).toBe('a');
    expect(format.plus4({ zip: 'a', plus4: 'b', zipPlus4: 'c' })).toBe('b');
    expect(format.zipPlus4({ zip: 'a', plus4: 'b', zipPlus4: 'c' })).toBe('c');
  });
});
