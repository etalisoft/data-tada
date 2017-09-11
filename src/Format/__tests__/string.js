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
    expect(format.charAt(4)(value)).toBe(value.charAt(4));
    expect(format.charCodeArray('ABC').join(',')).toBe([65, 66, 67].join(','));
    expect(format.charCodeAt(4)(value)).toBe(value.charCodeAt(4));
    expect(format.concat('b', 'c', 'd')('a')).toBe('abcd');
    expect(format.endsWith('son ')(value)).toBe(true);
    expect(format.includes('Hin')(value)).toBe(true);
    expect(format.indexOf('Hin')(value)).toBe(value.indexOf('Hin'));
    expect(format.lastIndexOf('Hin')(value)).toBe(value.lastIndexOf('Hin'));
    expect(format.localeCompare('bob')(value)).toBe(value.localeCompare('bob'));
    expect(format.maskMiddle('abc')).toBe('abc');
    expect(format.maskMiddle('abcd')).toBe('a**d');
    expect(format.maskMiddle('abcdefgh')).toBe('ab****gh');
    expect(format.maskMiddleWith()('abcdefgh')).toBe('ab****gh');
    expect(format.maskMiddleWith('?')('abcdefgh')).toBe('ab????gh');
    expect(format.match(/\s/g)(value).toString()).toBe(value.match(/\s/g).toString());
    expect(format.normalize()(value)).toBe(value.normalize());
    expect(format.padEnd(5, '*')(value)).toBe(value + '*****');
    expect(format.padStart(5, '*')(value)).toBe('*****' + value);
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
    expect(format.fromHex('000166FF').join(',')).toBe([0, 1, 102, 255].join(','));
    expect(format.toBase64('data-tada')).toBe('ZGF0YS10YWRh');
  });

  describe('.title', () => {
    it('should expose defaults', () => {
      const keys = 'word,capitalizeFirstWord,capitalizeLastWord,shortWords,replacements,particles'.split(',');
      expect(format.title.defaults).toExist().toIncludeKeys(keys);
    });

    it('should format', () => {
      const title = format.title();
      expect(title(' the night of ')).toBe(' The Night Of ');
      expect(title('BEFORE THE NIGHT OF CHRISTMAS')).toBe('Before the Night of Christmas');
      expect(title('my iphone iv was from the usa')).toBe('My iPhone IV Was From the USA');
      expect(title("a bOoK BY mcdOnald-o'reilly")).toBe("A Book by McDonald-O'Reilly");
      expect(title('AT&T merged with t-bone')).toBe('At&T Merged With T-Bone');
      expect(title(" the valueplus mcdonald-o'reilly of ")).toBe(" The Valueplus McDonald-O'Reilly Of ");
      const custom = format.title({
        capitalizeFirstWord: false,
        capitalizeLastWord: false,
        replacements: {
          valueplus: 'ValuePLUS',
        },
        particles: null,
      });
      expect(custom(" the valueplus mcdonald-o'reilly of ")).toBe(" the ValuePLUS Mcdonald-O'reilly of ");
    });
  });
});
