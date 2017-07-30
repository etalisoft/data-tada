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

    let result = value && value.toString instanceof Function ? value.toString() : value;
    if (result === null || result === undefined || result === '') {
      return required ? rejectWith('required') : resolve(result);
    }

    result = context.result = parse(result);

    if (!result) {
      return rejectWith('invalid');
    }

    if (validate instanceof Function && !validate(result)) {
      return rejectWith('validate');
    }

    return resolve(result);
  });
