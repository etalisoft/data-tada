import createExecutionPlan from '../createExecutionPlan';
import Message from '../Message';
import SyncPromise from '../SyncPromise';

const MESSAGES = {
  required: 'Required',
  invalid: 'Invalid',
  validate: 'Invalid',
};

const parseSsn = value => {
  if (typeof value === 'string') {
    const reg = /^\D*(\d{3})\D*(\d{2})\D*(\d{4})\D*$/;
    const match = value.match(reg);
    if (match) {
      const [, first3, middle2, last4] = match;
      return {
        ssn: `${first3}-${middle2}-${last4}`,
        first3,
        middle2,
        last4,
      };
    }
  }
  return null;
};

export default ({ model = SyncPromise, required = false, validate, messages, parse = parseSsn } = {}) =>
  createExecutionPlan(model)(value => (resolve, reject) => {
    const context = { value };
    const message = new Message(MESSAGES, messages).context(context);
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

    resolve(result);
  });
