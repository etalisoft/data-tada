const titleWords = /([a-z])([a-z]*)/gi;
const shortWords = /^(a|an|and|at|but|by|for|from|the|on|or|to)$/i;

export default {
  default: v => v,
  lower: v => v.toLowerCase(),
  upper: v => v.toUpperCase(),
  trim: v => v.trim(),
  title: v =>
    v.trim().replace(titleWords, (m, f, w, i) => {
      return i > 0 && shortWords.test(m) ? m.toLowerCase() : f.toUpperCase() + w.toLowerCase();
    }),
  toBase64: window.btoa,
  fromBase64: window.atob,
};
