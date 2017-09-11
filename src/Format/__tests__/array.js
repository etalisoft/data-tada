import expect from 'expect';

import format from '../array';

describe('Format.array', () => {
  it('should create new', () => {
    expect(JSON.stringify(format.new([0]))).toBe('[0]');
    expect(JSON.stringify(format.new())).toBe('[]');
    expect(JSON.stringify(format.new(null))).toBe('[]');
    expect(JSON.stringify(format.new(undefined))).toBe('[]');
  });

  it('should format for named types', () => {
    expect(format.fromCharCode([65, 66, 67])).toBe('ABC');
    expect(format.join()(['o', '.', 'O'])).toBe('o.O');
    expect(format.toHex([0, 1, 102, 255])).toBe('000166ff');
  });
});
