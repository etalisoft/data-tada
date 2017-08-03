import format from '../../Format/zip';
import createExecutionPlan from '../../createExecutionPlan';
import Message from '../../Message';
import defaults from './defaults';

const zip = ({
  model = defaults.model,
  required = defaults.required,
  validate = defaults.validate,
  messages = defaults.messages,
  parse = defaults.parse,
} = {}) =>
  createExecutionPlan(model)(value => (resolve, reject) => {
    const context = { value };
    const message = new Message(defaults.messages, messages).context(context);
    const rejectWith = err => reject(message.get(err));
    const resolveWith = val => resolve(format.new(val));

    const unwrapped = value && value.toString instanceof Function ? value.toString() : value;
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

zip.defaults = defaults;

export default zip;
