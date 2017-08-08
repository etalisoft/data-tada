import createStringParser from '../string';
import format from '../../Format/email';
import Message from '../../Message';
import defaults from './defaults';

const email = (
  {
    model = defaults.model,
    trim = defaults.trim,
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
  createStringParser({
    model,
    trim,
    required,
    minLength,
    maxLength,
    regex,
    notRegex,
    validate,
    messages,
  }).then(value => {
    const context = { value };
    const message = new Message(defaults.messages, messages).context(context);
    const resolveWith = format.new;
    const rejectWith = err => {
      throw message.get(err);
    };

    if (!value) {
      return required ? rejectWith('required') : resolveWith(value);
    }

    const result = parse(value);
    if (!result) {
      return rejectWith('invalid');
    }

    return resolveWith(result);
  });

email.defaults = defaults;

export default email;
