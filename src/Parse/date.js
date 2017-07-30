import moment from 'moment';

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

const render = m => ({
  moment: m,
  date: m.toDate(),
  // AM/PM
  A: m.format('A'),
  // weekday
  ddd: m.format('ddd'),
  dddd: m.format('dddd'),
  // day
  D: m.format('D'),
  DD: m.format('DD'),
  // hour (12-hour clock)
  h: m.format('h'),
  hh: m.format('hh'),
  // hour (24-hour clock)
  H: m.format('H'),
  HH: m.format('HH'),
  // localized
  l: m.format('l'),
  L: m.format('L'),
  LT: m.format('LT'),
  LTS: m.format('LTS'),
  // minute
  m: m.format('m'),
  mm: m.format('mm'),
  // month
  M: m.format('M'),
  MM: m.format('MM'),
  // month name
  MMM: m.format('MMM'),
  MMMM: m.format('MMMM'),
  // fraction of second
  S: m.format('S'),
  SS: m.format('SS'),
  SSS: m.format('SSS'),
  SSSS: m.format('SSSS'),
  // year
  YY: m.format('YY'),
  YYYY: m.format('YYYY'),
  // time zone
  Z: m.format('Z'),
});

const parse = (v, ...args) => {
  let value = v instanceof Function ? v() : v;

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

    let result = (context.result = value);
    result = render(parse(result, formats, ...args));

    if (!value) {
      return required ? rejectWith('required') : resolve(result);
    }

    if (!result.moment.isValid()) {
      return rejectWith('invalid');
    }

    if (min) {
      const dt = (context.min = parse(min, formats, ...args));
      if (result.moment.isBefore(dt)) {
        return rejectWith('min');
      }
    }

    if (max) {
      const dt = (context.max = parse(max, formats, ...args));
      if (result.moment.isAfter(dt)) {
        return rejectWith('max');
      }
    }

    if (validate instanceof Function && !validate(result)) {
      return rejectWith('validate');
    }

    resolve(result);
  });
