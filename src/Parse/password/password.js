import createStringParser from '../string';
import Message from '../../Message';
import defaults from './defaults';

const password = (
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
    parse,
  });

password.defaults = defaults;

export default password;
