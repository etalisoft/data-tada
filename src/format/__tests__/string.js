import expect from 'expect';

import format from '../string';

describe('format.string', () => {
  it('should format for named types', () => {
    const value = " tHe tHinG aNd tHe tHinG, o'rEilLy sMiTh-wIlson ";
    const FORMATS = {
      default: value,
      lower: " the thing and the thing, o'reilly smith-wilson ",
      upper: " THE THING AND THE THING, O'REILLY SMITH-WILSON ",
      trim: "tHe tHinG aNd tHe tHinG, o'rEilLy sMiTh-wIlson",
      title: "The Thing and the Thing, O'Reilly Smith-Wilson",
      toBase64: window.btoa(value),
    };
    Object.keys(FORMATS).forEach(k => {
      const expected = FORMATS[k];
      const actual = format[k](value);
      expect(actual).toBe(expected, `${k}: Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
    });
    expect(format.fromBase64('ZGF0YS10YWRh')).toBe('data-tada');
    const json = { a: 1, b: 'b', c: {}, d: null, e: [], f: true };
    expect(format.json(JSON.stringify(json))).toInclude(json);
  });
});
