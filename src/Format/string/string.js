import title from './title';

export default {
  new: v => create(v),

  charAt: n => s => s.charAt(n),
  charCodeArray: s => s.split('').map(c => c.charCodeAt(0)),
  charCodeAt: n => s => s.charCodeAt(n),
  concat: (...more) => s => s.concat(...more),
  empty: () => '',
  endsWith: (...args) => s => s.endsWith(...args),
  fromBase64: window.atob,
  fromCharCode: String.fromCharCode,
  fromHex: s => s.match(/\w\w/g).reduce((a, c) => a.push(parseInt(c, 16)) && a, []),
  includes: (...args) => s => s.includes(...args),
  indexOf: (...args) => s => s.indexOf(...args),
  lastIndexOf: (...args) => s => s.lastIndexOf(...args),
  left: n => s => s.slice(0, n),
  length: s => s.length,
  localeCompare: (...args) => s => s.localeCompare(...args),
  localeLower: (...args) => s => s.toLocaleLowerCase(...args),
  localeUpper: (...args) => s => s.toLocaleUpperCase(...args),
  lower: s => s.toLowerCase(),
  maskMiddle: maskMiddleWith(),
  maskMiddleWith,
  match: regex => s => s.match(regex),
  normalize: form => s => s.normalize(form),
  padEnd: (len, pad) => s => s + String(pad || ' ').repeat(len >> 0),
  padStart: (len, pad) => s => String(pad || '').repeat(len >> 0) + s,
  repeat: n => s => s.repeat(n),
  replace: (pattern, replacement) => s => s.replace(pattern, replacement),
  right: n => s => s.slice(-n),
  search: regex => s => s.search(regex),
  slice: (...args) => s => s.slice(...args),
  split: (...args) => s => s.split(...args),
  startsWith: (...args) => s => s.startsWith(...args),
  string: s => s,
  substr: (...args) => s => s.substr(...args),
  title,
  toBase64: window.btoa,
  trim: s => s.trim(),
  upper: s => s.toUpperCase(),
};

function maskMiddleWith(char = '*') {
  return str => {
    var reg = /^(\w)(\w{2,3})(\w$)|(\w\w)(\w+?)(\w\w$)/;
    var match = str.match(reg);
    if (match) {
      var o = match[1] ? 1 : 4;
      return match[o] + new Array(match[o + 1].length + 1).join(char) + match[o + 2];
    }
    return str;
  };
}

function create(value) {
  return typeof value === 'string' ? value : value === null || value === undefined ? '' : `${value}`;
}
