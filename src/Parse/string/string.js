import format from '../../Format/string';
import createExecutionPlan from '../../createExecutionPlan';
import Message from '../../Message';
import defaults from './defaults';

const string = (
  {
    model = defaults.model,
    required = defaults.required,
    minLength = defaults.minLength,
    maxLength = defaults.maxLength,
    regex = defaults.regex,
    notRegex = defaults.notRegex,
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

    const result = context.result = parse(unwrapped);
    if(result === undefined) {
      return rejectWith('invalid');
    }

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

string.defaults = defaults;

export default string;
