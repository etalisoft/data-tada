import moment from 'moment';

export default {
  new: value => create(value),

  now: () => create(moment()),
  today: () => create(moment().startOf('day')),

  moment: m => m,
  daysInMonth: m => m.daysInMonth(),
  ISO: m => m.toISOString(),
  local: m => m.local(),
  ticks: m => m.valueOf(),
  utc: m => m.utc(),
  valid: m => m.isValid(),
  array: m => m.toArray(),
  date: m => m.toDate(),
  object: m => m.toObject(),

  add: (...args) => m => m.add(args),
  bound: (low, high) => m => moment.max(low, moment.min(high, m)),
  calendar: (...args) => m => m.calendar(...args),
  diff: d => m => m.diff(d),
  endOf: s => m => m.endOf(s),
  format: f => m => m.format(f),
  from: d => m => m.from(d),
  fromNow: b => m => m.fromNow(b),
  min: d => m => moment.min(d, m),
  max: d => m => moment.max(d, m),
  subtract: (...args) => m => m.subtract(args),
  startOf: s => m => m.startOf(s),
  to: d => m => m.to(d),
  toNow: b => m => m.toNow(b),
  utcOffset: (...args) => m => m.utcOffset(...args),
};

function create(value) {
  return value instanceof moment ? value : moment.invalid();
}
