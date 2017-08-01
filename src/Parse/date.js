import moment from 'moment';

import format from '../Format/date';
import createExecutionPlan from '../createExecutionPlan';
import Message from '../Message';
import SyncPromise from '../SyncPromise';

const FORMATS = ['MMM D, YYYY', 'L', moment.ISO_8601];

const MESSAGES = {
  required: 'Required',
  invalid: 'Invalid',
  min: 'Too Early',
  max: 'Too Late',
  validate: 'Invalid',
};

const parse = (v, ...args) => {
  let value = v instanceof Function ? v() : v;

  if (value instanceof moment) {
    return value;
  }

  if (value === 'now' || value === false) {
    return moment();
  }

  if (value === 'today') {
    return moment().startOf('day');
  }

  if (typeof value === 'string') {
    const m = moment(value, ...args);
    return m.isValid() ? m : moment(value);
  }

  return moment(value);
};

export default (
  { model = SyncPromise, required = false, min, max, validate, messages, formats = FORMATS, ...args } = {}
) =>
  createExecutionPlan(model)(value => (resolve, reject) => {
    const context = { value };
    const message = new Message(MESSAGES, messages).context(context);
    const rejectWith = err => reject(message.get(err));
    const resolveWith = val => resolve(format.new(val));

    if (value === null || value === '') {
      return required ? rejectWith('required') : resolveWith(value);
    }

    const result = (context.result = format.new(parse(value, formats, ...args)));

    if (!result.isValid()) {
      return rejectWith('invalid');
    }

    if (min) {
      const dt = (context.min = parse(min, formats, ...args));
      if (result.isBefore(dt)) {
        return rejectWith('min');
      }
    }

    if (max) {
      const dt = (context.max = parse(max, formats, ...args));
      if (result.isAfter(dt)) {
        return rejectWith('max');
      }
    }

    if (validate instanceof Function && !validate(result)) {
      return rejectWith('validate');
    }

    resolveWith(result);
  });
