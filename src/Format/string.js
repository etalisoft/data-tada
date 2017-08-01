const titleWords = /([a-z])([a-z]*)/gi;
const shortWords = /^(a|an|and|at|but|by|for|from|the|on|or|to)$/i;

export default {
  new: v => create(v),
  empty: () => '',
  string: s => s,
  length: s => s.length,
  lower: s => s.toLowerCase(),
  upper: s => s.toUpperCase(),
  localeLower: (...args) => s => s.toLocaleLowerCase(...args),
  localeUpper: (...args) => s => s.toLocaleUpperCase(...args),
  trim: s => s.trim(),
  title: v =>
    v.trim().replace(titleWords, (m, f, w, i) => {
      return i > 0 && shortWords.test(m) ? m.toLowerCase() : f.toUpperCase() + w.toLowerCase();
    }),
  charAt: n => s => s.charAt(n),
  charCodeAt: n => s => s.charCodeAt(n),
  concat: (...more) => s => s.concat(...more),
  endsWith: (...args) => s => s.endsWith(...args),
  includes: (...args) => s => s.includes(...args),
  indexOf: (...args) => s => s.indexOf(...args),
  lastIndexOf: (...args) => s => s.lastIndexOf(...args),
  localeCompare: (...args) => s => s.localeCompare(...args),
  match: regex => s => s.match(regex),
  normalize: form => s => s.normalize(form),
  padEnd: (...args) => s => s.padEnd(...args),
  padStart: (...args) => s => s.padStart(...args),
  repeat: n => s => s.repeat(n),
  replace: (pattern, replacement) => s => s.replace(pattern, replacement),
  search: regex => s => s.search(regex),
  left: n => s => s.slice(0, n),
  right: n => s => s.slice(-n),
  slice: (...args) => s => s.slice(...args),
  split: (...args) => s => s.split(...args),
  startsWith: (...args) => s => s.startsWith(...args),
  substr: (...args) => s => s.substr(...args),
  fromBase64: window.atob,
  fromCharCode: String.fromCharCode,
  toBase64: window.btoa,
};

function create(value) {
  return typeof value === 'string' ? value : value === null || value === undefined ? '' : `${value}`;
}
