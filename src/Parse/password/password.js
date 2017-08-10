import createStringParser from '../string';
import format from '../../Format/password';
import Message from '../../Message';
import defaults from './defaults';

const password = (
  {
    model = defaults.model,
    trim = defaults.trim,
    required = defaults.required,
    minLength = defaults.minLength,
    maxLength = defaults.maxLength,
    minLower = defaults.minLower,
    maxLower = defaults.maxLower,
    minUpper = defaults.minUpper,
    maxUpper = defaults.maxUpper,
    minDigit = defaults.minDigit,
    maxDigit = defaults.maxDigit,
    minSymbol = defaults.minSymbol,
    maxSymbol = defaults.maxSymbol,
    minNonPrint = defaults.minNonPrint,
    maxNonPrint = defaults.maxNonPrint,
    minAsciiExtended = defaults.minAsciiExtended,
    maxAsciiExtended = defaults.maxAsciiExtended,
    minUnicode = defaults.minUnicode,
    maxUnicode = defaults.maxUnicode,
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
  }).then(value => {
    const context = { value };
    const message = new Message(defaults.messages, messages).context(context);
    const rejectWith = err => {
      throw message.get(err);
    };

    if(!value) {
      return required ? rejectWith('required') : format.new(value);
    }

    const result = format.new(value);

    if (result.lower < minLower) {
      rejectWith('minLower');
    }

    if (result.lower > maxLower) {
      rejectWith('maxLower');
    }

    if (result.upper < minUpper) {
      rejectWith('minUpper');
    }

    if (result.upper > maxUpper) {
      rejectWith('maxUpper');
    }

    if (result.digit < minDigit) {
      rejectWith('minDigit');
    }

    if (result.digit > maxDigit) {
      rejectWith('maxDigit');
    }

    if (result.symbol < minSymbol) {
      rejectWith('minSymbol');
    }

    if (result.symbol > maxSymbol) {
      rejectWith('maxSymbol');
    }

    if (result.nonPrint < minNonPrint) {
      rejectWith('minNonPrint');
    }

    if (result.nonPrint > maxNonPrint) {
      rejectWith('maxNonPrint');
    }

    if (result.asciiExtended < minAsciiExtended) {
      rejectWith('minAsciiExtended');
    }

    if (result.asciiExtended > maxAsciiExtended) {
      rejectWith('maxAsciiExtended');
    }

    if (result.unicode < minUnicode) {
      rejectWith('minUnicode');
    }

    if (result.unicode > maxUnicode) {
      rejectWith('maxUnicode');
    }

    return result;
  });

password.defaults = defaults;

export default password;
