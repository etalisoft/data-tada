import format from '../Format/phone';
import createExecutionPlan from '../createExecutionPlan';
import Message from '../Message';
import SyncPromise from '../SyncPromise';

const MESSAGES = {
  required: 'Required',
  invalid: 'Invalid',
  validate: 'Invalid',
};

const parsePhone = value => {
  if (typeof value === 'string') {
    const reg = /^\D*(1?\D*(\d{3}))?\D*(\d{3})\D*(\d{4})([^\dxX]*[xX][^\dxX]*(\d+))?\D*$/;
    const match = value.match(reg);
    if (match) {
      const [, , areaCode, local3, last4, , extension] = match;
      return {
        phone: (areaCode ? `(${areaCode}) ` : '') + `${local3}-${last4}` + (extension ? ` ext. ${extension}` : ''),
        areaCode: areaCode || null,
        local3,
        last4,
        extension: extension || null,
      };
    }
  }
  return null;
};

export default ({ model = SyncPromise, required = false, validate, messages, parse = parsePhone } = {}) =>
  createExecutionPlan(model)(value => (resolve, reject) => {
    const context = { value };
    const message = new Message(MESSAGES, messages).context(context);
    const rejectWith = err => reject(message.get(err));
    const resolveWith = val => resolve(format.new(val));

    let unwrapped = value && value.toString instanceof Function ? value.toString() : value;

    if (unwrapped === null || unwrapped === undefined || unwrapped === '') {
      return required ? rejectWith('required') : resolveWith(unwrapped);
    }

    const result = (context.result = parse(unwrapped));
    if (!result) {
      return rejectWith('invalid');
    }

    if (validate instanceof Function && !validate(result)) {
      return rejectWith('validate');
    }

    return resolveWith(result);
  });
