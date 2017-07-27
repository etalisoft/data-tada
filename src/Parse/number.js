import Message from '../Message';
import SyncPromise from '../SyncPromise';

const MESSAGES = {
  required: 'Required',
  invalid: 'Invalid',
  min: 'Too Low',
  max: 'Too High',
  validate: 'Invalid',
};

const tryParseFloat = value => {
  const result = parseFloat(value);
  return isNaN(result) ? value : result;
};

const scrubFloat = value => {
  if (typeof value === 'string') {
    // Purge non-numeric characters from the start of the string
    const trim = value.replace(/^[^\d+-\.]*/, '');
    // Keep only digit characters
    const match = trim.match(/^[+-]?\D?\s?[\d,]*(\.\d*)?([eE][+-]\d+)?/);
    if (match && match[0].match(/\d/)) {
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
    messages,
    parse = tryParseFloat,
    scrub = scrubFloat,
  } = {}
) => value =>
  new model((resolve, reject) => {
    const message = new Message(MESSAGES, messages).context(value);
    const rejectWith = err => reject(message.get(err));

    let result = value && value.toString instanceof Function ? value.toString() : value;
    if (result === null || result === undefined || result === '') {
      return required ? rejectWith('required') : resolve(result);
    }

    result = parse(result);
    if (isNaN(result)) {
      result = parse(scrub(result));
    }

    if (isNaN(result)) {
      return rejectWith('invalid');
    }

    if (result < min) {
      return rejectWith('min');
    }

    if (result > max) {
      return rejectWith('max');
    }

    if (validate instanceof Function && !validate(result)) {
      return rejectWith('validate');
    }

    return resolve(result);
  });
