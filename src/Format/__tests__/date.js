import expect from 'expect';
import moment from 'moment';

import format from '../date';

describe('Format.date', () => {
  it('should create new', () => {
    const valid = format.new(moment());
    expect(valid).toBeA(moment);
    expect(valid.isValid()).toBe(true);

    const invalid = format.new();
    expect(invalid).toBeA(moment);
    expect(invalid.isValid()).toBe(false);
  });

  it('should format for named types', () => {
    const m = moment('2003-06-05 7:02 PM', 'YYYY-MM-DD h:mm P');
    const VALUES = {
      moment: m,
      daysInMonth: m.daysInMonth(),
      ISO: m.toISOString(),
      local: m.local(),
      ticks: m.valueOf(),
      utc: m.utc(),
      valid: m.isValid(),
    };
    Object.keys(VALUES).forEach(k => {
      expect(format[k](m)).toBe(VALUES[k], k);
    });
    expect(format.array(m).toString()).toInclude(m.toArray().toString(), 'array');
    expect(format.date(m).valueOf()).toBe(m.toDate().valueOf(), 'date');
    expect(format.object(m)).toInclude(m.toObject(), 'object');

    expect(format.add(3, 'days')(m)).toBe(m.add(3, 'days'), 'add');
    expect(format.bound(moment('2005-01-01'), moment())(m).valueOf()).toBe(moment('2005-01-01').valueOf());
    expect(format.calendar()(m)).toBe(m.calendar());
    expect(format.diff(moment('2000-01-01'))(m)).toBe(m.diff('2000-01-01'));
    expect(format.endOf(moment('2000-01-01'))(m)).toBe(m.endOf('2000-01-01'));
    expect(format.format('YYYY')(m)).toBe(m.format('YYYY'));
    expect(format.from('2000-01-01')(m)).toBe(m.from('2000-01-01'));
    expect(format.fromNow()(m)).toBe(m.fromNow());
    expect(format.invalid().isValid()).toBe(false);
    expect(format.min(moment('2000-01-01'))(m).valueOf()).toBe(moment('2000-01-01').valueOf());
    expect(format.max(moment('2000-01-01'))(m).valueOf()).toBe(m.valueOf());
    expect(format.subtract(3, 'days')(m)).toBe(m.subtract(3, 'days'));
    expect(format.startOf('year')(m)).toBe(m.startOf('year'));
    expect(format.to(moment())(m)).toBe(m.to(moment()));
    expect(format.toNow()(m)).toBe(m.toNow());
    expect(format.utcOffset()(m)).toBe(m.utcOffset());
  });
});
