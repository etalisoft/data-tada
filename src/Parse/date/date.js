import format from '../../Format/date';
import createExecutionPlan from '../../createExecutionPlan';
import Message from '../../Message';
import defaults from './defaults';

const date = (
  {
    model = defaults.model,
    required = defaults.required,
    min = defaults.min,
    max = defaults.max,
    validate = defaults.validate,
    messages = defaults.messages,
    parse = defaults.parse,
    formats = defaults.formats,
    ...args
  } = {}
) =>
  createExecutionPlan(model)(value => (resolve, reject) => {
    const context = { value };
    const message = new Message(defaults.messages, messages).context(context);
    const rejectWith = err => reject(message.get(err));
    const resolveWith = val => resolve(format.new(val));

    if (value === null || value === '') {
      return required ? rejectWith('required') : resolveWith(value);
    }

    const params = args.length ? args : defaults.args ? defaults.args : [];

    const result = (context.result = format.new(parse(value, formats, ...params)));

    if (!result.isValid()) {
      return rejectWith('invalid');
    }

    if (min) {
      const dt = (context.min = parse(min, formats, ...params));
      if (result.isBefore(dt)) {
        return rejectWith('min');
      }
    }

    if (max) {
      const dt = (context.max = parse(max, formats, ...params));
      if (result.isAfter(dt)) {
        return rejectWith('max');
      }
    }

    if (validate instanceof Function && !validate(result)) {
      return rejectWith('validate');
    }

    resolveWith(result);
  });
date.defaults = defaults;

export default date;
