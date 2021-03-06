import format from '../../Format/number';
import createExecutionPlan from '../../createExecutionPlan';
import Message from '../../Message';
import defaults from './defaults';

const number = (
  {
    model = defaults.model,
    required = defaults.required,
    min = defaults.min,
    max = defaults.max,
    validate = defaults.validate,
    messages = defaults.messages,
    parse = defaults.parse,
  } = {}
) =>
  createExecutionPlan(model)(value => (resolve, reject) => {
    const context = { value };
    const message = new Message(defaults.messages, messages).context(context);
    const rejectWith = err => reject(message.get(err));
    const resolveWith = val => resolve(format.new(val));

    const unwrapped = value && value.toString instanceof Function ? value.toString() : value;
    if (unwrapped === null || unwrapped === undefined || unwrapped === '') {
      return required ? rejectWith('required') : resolveWith(unwrapped);
    }

    let result = context.result = parse(unwrapped);
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

    return resolveWith(result);
  });

number.defaults = defaults;

export default number;
