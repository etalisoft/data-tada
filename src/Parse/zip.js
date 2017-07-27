import Message from '../Message';
import SyncPromise from '../SyncPromise';

const MESSAGES = {
  required: 'Required',
  invalid: 'Invalid',
  validate: 'Invalid',
};

const parseZip = value => {
  if (typeof value === 'string') {
    const reg = /^\D*(\d{5})\D*(\d{4})?\D*$/;
    const match = value.match(reg);
    if (match) {
      const [, zip, plus4] = match;
      return {
        zip,
        plus4,
        zipPlus4: zip + (plus4 ? `-${plus4}` : ''),
      };
    }
  }
  return null;
};

export default ({ model = SyncPromise, required = false, validate, messages, parse = parseZip } = {}) => value =>
  new model((resolve, reject) => {
    const message = new Message(MESSAGES, messages).context(value);
    const rejectWith = err => reject(message.get(err));

    let result = value && value.toString instanceof Function ? value.toString() : value;
    if (result === null || result === undefined || result === '') {
      return required ? rejectWith('required') : resolve(result);
    }

    result = parse(result);
    if (!result) {
      return rejectWith('invalid');
    }

    if (validate instanceof Function && !validate(result)) {
      return rejectWith('validate');
    }

    return resolve(result);
  });
