const tryParse = value => {
  const result = parseFloat(value);
  return isNaN(result) ? value : result;
};

const scrub = value => {
  if (typeof value === 'string') {
    // Purge non-numeric characters from the start of the string
    const trim = value.replace(/^[^\d+-.]*/, '');
    // Keep only digit characters
    const match = trim.match(/^[+-]?\D?\s?[\d,]*(\.\d*)?([eE][+-]\d+)?/);
    if (match && match[0].match(/\d/)) {
      // Replace debris characters (commas)
      return match[0].replace(/[^eE\d+\-.]*/g, '');
    }
  }
  return value;
};

export default value => {
  let result = tryParse(value);
  if (isNaN(result)) {
    result = tryParse(scrub(result));
  }
  return isNaN(result) ? NaN : result;
}
