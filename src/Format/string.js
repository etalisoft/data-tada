const titleWords = /([a-z])([a-z]*)/gi;
const shortWords = /^(a|an|and|at|but|by|for|from|the|on|or|to)$/i;

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
  padEnd: (...args) => s => s.padEnd(...args),
  padStart: (...args) => s => s.padStart(...args),
  repeat: n => s => s.repeat(n),
  replace: (pattern, replacement) => s => s.replace(pattern, replacement),
  right: n => s => s.slice(-n),
  search: regex => s => s.search(regex),
  slice: (...args) => s => s.slice(...args),
  split: (...args) => s => s.split(...args),
  startsWith: (...args) => s => s.startsWith(...args),
  string: s => s,
  substr: (...args) => s => s.substr(...args),
  title: v =>
    v.trim().replace(titleWords, (m, f, w, i) => {
      return i > 0 && shortWords.test(m) ? m.toLowerCase() : f.toUpperCase() + w.toLowerCase();
    }),
  toBase64: window.btoa,
  trim: s => s.trim(),
  upper: s => s.toUpperCase(),
};

function create(value) {
  return typeof value === 'string' ? value : value === null || value === undefined ? '' : `${value}`;
}
