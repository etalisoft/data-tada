import defaults from './defaults';

const title = (
  {
    word = defaults.word,
    capitalizeFirstWord = defaults.capitalizeFirstWord,
    capitalizeLastWord = defaults.capitalizeLastWord,
    shortWords = defaults.shortWords,
    replacements = defaults.replacements,
    particles = defaults.particles,
  } = {}
) => value => {
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

title.defaults = defaults;

export default title;
