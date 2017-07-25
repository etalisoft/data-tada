import moment from 'moment';

import SyncPromise from '../SyncPromise';

const FORMATS = ['L', moment.ISO_8601];

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
  { model = SyncPromise, required = false, min, max, validate, formats = FORMATS, ...args } = {}
) => value =>
  new model((resolve, reject) => {
    let result = value;
    result = render(parse(result, formats, ...args));

    if (!value) {
      return required ? reject('required') : resolve(result);
    }

    if (!result.moment.isValid()) {
      return reject('invalid');
    }

    if (min) {
      const dt = parse(min, formats, ...args);
      if (!dt.isValid()) {
        return reject('invalidMin');
      }
      if (result.moment.isBefore(dt)) {
        return reject('min');
      }
    }

    if (max) {
      const dt = parse(max, formats, ...args);
      if (!dt.isValid()) {
        return reject('invalidMax');
      }
      if (result.moment.isAfter(dt)) {
        return reject('max');
      }
    }

    if (validate instanceof Function && !validate(result)) {
      return reject('validate');
    }

    resolve(result);
  });
