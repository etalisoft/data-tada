import SyncPromise from '../SyncPromise';

const tryParseFloat = value => {
  const result = parseFloat(value);
  return isNaN(result) ? value : result;
};

const scrubFloat = value => {
  if (typeof value === 'string') {
    // Purge non-numeric characters from the start of the string
    let trim = value.replace(/^[^\d+-\.]*/, '');
    // Keep only digit characters
    const match = trim.match(/^[+-]?\D?\s?[\d,]*(\.\d*)?([eE][+-]\d+)?/);
    if (match) {
      // Replace debris characters (commas)
      return match[0].replace(/[^eE\d+\-.]*/g, '');
    }
  }
  return value;
};

export default (
  {
    model = SyncPromise,
    required = false,
    min = Number.NEGATIVE_INFINITY,
    max = Number.MAX_VALUE,
    validate,
    parse = tryParseFloat,
    scrub = scrubFloat,
  } = {}
) => value =>
  new model((resolve, reject) => {
    let result = value && value.toString instanceof Function ? value.toString() : value;
    if (result === null || result === undefined || result === '') {
      return required ? reject('required') : resolve(result);
    }

    result = parse(result);
    if (isNaN(result)) {
      result = parse(scrub(result));
    }

    if (isNaN(result)) {
      return reject('invalid');
    }

    if (result < min) {
      return reject('min');
    }

    if (result > max) {
      return reject('max');
    }

    if (validate instanceof Function && !validate(result)) {
      return reject('validate');
    }

    return resolve(result);
  });
