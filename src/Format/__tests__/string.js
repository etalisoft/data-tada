import expect from 'expect';

import format from '../string';

describe('Format.string', () => {
  it('should create new', () => {
    expect(format.new('abc')).toBe('abc');
    expect(format.new()).toBe('');
    expect(format.new(null)).toBe('');
    expect(format.new(undefined)).toBe('');
    expect(format.new({ toString: () => 'o.O' })).toBe('o.O');
  });

  it('should format for named types', () => {
    const value = " tHe tHinG aNd tHe tHinG, o'rEilLy sMiTh-wIlson ";
    expect(format.empty()).toBe('');
    expect(format.string(value)).toBe(value);
    expect(format.length(value)).toBe(value.length);
    expect(format.lower(value)).toBe(value.toLowerCase());
    expect(format.upper(value)).toBe(value.toUpperCase());
    expect(format.localeLower()(value)).toBe(value.toLocaleLowerCase());
    expect(format.localeUpper()(value)).toBe(value.toLocaleUpperCase());
    expect(format.trim(value)).toBe(value.trim());
    expect(format.title(value)).toBe("The Thing and the Thing, O'Reilly Smith-Wilson");
    expect(format.charAt(4)(value)).toBe(value.charAt(4));
    expect(format.charCodeAt(4)(value)).toBe(value.charCodeAt(4));
    expect(format.concat('b', 'c', 'd')('a')).toBe('abcd');
    expect(format.endsWith('son ')(value)).toBe(true);
    expect(format.includes('Hin')(value)).toBe(true);
    expect(format.indexOf('Hin')(value)).toBe(value.indexOf('Hin'));
    expect(format.lastIndexOf('Hin')(value)).toBe(value.lastIndexOf('Hin'));
    expect(format.localeCompare('bob')(value)).toBe(value.localeCompare('bob'));
    expect(format.match(/\s/g)(value).toString()).toBe(value.match(/\s/g).toString());
    expect(format.normalize()(value)).toBe(value.normalize());
    expect(format.padEnd(5, '*')(value)).toBe(value.padEnd(5, '*'));
    expect(format.padStart(5, '*')(value)).toBe(value.padStart(5, '*'));
    expect(format.repeat(2)(value)).toBe(value.repeat(2));
    expect(format.replace(/Hin/g, 'hin')(value)).toBe(value.replace(/Hin/g, 'hin'));
    expect(format.search(/Hin/)(value)).toBe(value.search(/Hin/));
    expect(format.left(5)(value)).toBe(value.slice(0, 5));
    expect(format.right(5)(value)).toBe(value.slice(-5));
    expect(format.slice(5, 9)(value)).toBe(value.slice(5, 9));
    expect(format.split(' ')(value).toString()).toBe(value.split(' ').toString());
    expect(format.startsWith(' ')(value)).toBe(value.startsWith(' '));
    expect(format.substr(0, 8)(value)).toBe(value.substr(0, 8));
    expect(format.fromBase64('ZGF0YS10YWRh')).toBe('data-tada');
    expect(format.fromCharCode(65, 66, 67)).toBe('ABC');
    expect(format.toBase64('data-tada')).toBe('ZGF0YS10YWRh');
  });
});
