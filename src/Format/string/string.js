import title from './title';

export default {
  new: v => create(v),

  charAt: n => s => s.charAt(n),
  charCodeAt: n => s => s.charCodeAt(n),
  concat: (...more) => s => s.concat(...more),
  empty: () => '',
  endsWith: (...args) => s => s.endsWith(...args),
  fromBase64: window.atob,
  fromCharCode: String.fromCharCode,
  includes: (...args) => s => s.includes(...args),
  indexOf: (...args) => s => s.indexOf(...args),
  lastIndexOf: (...args) => s => s.lastIndexOf(...args),
  left: n => s => s.slice(0, n),
  length: s => s.length,
  localeCompare: (...args) => s => s.localeCompare(...args),
  localeLower: (...args) => s => s.toLocaleLowerCase(...args),
  localeUpper: (...args) => s => s.toLocaleUpperCase(...args),
  lower: s => s.toLowerCase(),
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

function create(value) {
  return typeof value === 'string' ? value : value === null || value === undefined ? '' : `${value}`;
}
