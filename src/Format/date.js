import moment from "moment";

export default {
  new: value => create(value),

  add: (...args) => m => m.add(args),
  array: m => m.toArray(),
  bound: (low, high) => m => moment.max(low, moment.min(high, m)),
  calendar: (...args) => m => m.calendar(...args),
  date: m => m.toDate(),
  daysInMonth: m => m.daysInMonth(),
  diff: d => m => m.diff(d),
  endOf: s => m => m.endOf(s),
  format: f => m => m.format(f),
  from: d => m => m.from(d),
  fromNow: b => m => m.fromNow(b),
  ISO: m => m.toISOString(),
  local: m => m.local(),
  max: d => m => moment.max(d, m),
  min: d => m => moment.min(d, m),
  moment: m => m,
  now: () => create(moment()),
  object: m => m.toObject(),
  subtract: (...args) => m => m.subtract(args),
  startOf: s => m => m.startOf(s),
  ticks: m => m.valueOf(),
  to: d => m => m.to(d),
  today: () => create(moment().startOf("day")),
  toNow: b => m => m.toNow(b),
  utc: m => m.utc(),
  utcOffset: (...args) => m => m.utcOffset(...args),
  valid: m => m.isValid(),
};

function create(value) {
  return value instanceof moment ? value : moment.invalid();
}
