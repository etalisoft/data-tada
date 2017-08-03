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
  title: toTitleCase,
  toBase64: window.btoa,
  trim: s => s.trim(),
  upper: s => s.toUpperCase(),
};

function create(value) {
  return typeof value === 'string' ? value : value === null || value === undefined ? '' : `${value}`;
}

function toTitleCase(
  {
    word = /[a-z]([^\s-&]*)/gi,
    capitalizeFirstWord = true,
    capitalizeLastWord = true,
    shortWords = /^(a|an|and|at|but|by|for|in|nor|of|on|or|so|the|to|up|yet)$/,
    replacements = {
      ii: 'II',
      iii: 'III',
      iv: 'IV',
      llc: 'LLC',
      usa: 'USA',
      ytd: 'YTD',
      itunes: 'iTunes',
      iphone: 'iPhone',
    },
    particles = {
      test: /^(mc|o')/,
      replacements: {
        mc: 'Mc',
        "o'": "O'",
      },
    },
  } = {}
) {
  return value => {
    const matches = [];
    const firstWord = i => capitalizeFirstWord && i === 0;
    const lastWord = i => capitalizeLastWord && i === matches.length - 1;
    const shortWord = w => shortWords && shortWords.test(w);
    const getParticle = w => particles && particles.test && (w.match(particles.test) || [])[0];

    value.replace(word, (match, ...args) => {
      matches.push({
        lower: match.toLowerCase(),
        start: args[args.length - 2],
      });
      return '';
    });

    return matches.reduce((s, { lower, start }, index) => {
      let v = lower;
      if (replacements && replacements.hasOwnProperty(lower)) {
        v = replacements[lower];
      } else if (firstWord(index) || lastWord(index) || !shortWord(lower)) {
        const particle = getParticle(lower);
        if (particle) {
          const sub = lower.slice(particle.length);
          v = particles.replacements[particle] + (sub.length ? sub[0].toUpperCase() + sub.slice(1) : '');
        } else {
          v = lower[0].toUpperCase() + lower.slice(1);
        }
      }
      return s.slice(0, start) + v + s.slice(start + lower.length);
    }, value);
  };
}
