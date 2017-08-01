import format from '../Format/string';
import createExecutionPlan from '../createExecutionPlan';
import Message from '../Message';
import SyncPromise from '../SyncPromise';

const MESSAGES = {
  required: 'Required',
  minLength: 'Too Short',
  maxLength: 'Too Long',
  regex: 'Invalid',
  notRegex: 'Invalid',
  validate: 'Invalid',
};

export default (
  {
    model = SyncPromise,
    required = false,
    minLength = 0,
    maxLength = Number.MAX_VALUE,
    regex,
    notRegex,
    validate,
    messages,
  } = {}
) =>
  createExecutionPlan(model)(value => (resolve, reject) => {
    const context = { value, result };
    const message = new Message(MESSAGES, messages).context(context);
    const rejectWith = err => reject(message.get(err));
    const resolveWith = val => resolve(format.new(val));

    const unwrapped = value && value.toString instanceof Function ? value.toString() : value;
    if (unwrapped === null || unwrapped === undefined || unwrapped === '') {
      return required ? rejectWith('required') : resolveWith(unwrapped);
    }

    const result = `${unwrapped}`;

    if (minLength && result.length < minLength) {
      return rejectWith('minLength');
    }

    if (result.length > maxLength) {
      return rejectWith('maxLength');
    }

    if (regex && !regex.test(result)) {
      return rejectWith('regex');
    }

    if (notRegex && notRegex.test(result)) {
      return rejectWith('notRegex');
    }

    if (validate instanceof Function && !validate(result)) {
      return rejectWith('validate');
    }

    return resolveWith(result);
  });
