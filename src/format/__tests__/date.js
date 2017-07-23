import expect from 'expect';
import moment from 'moment';

import format from '../date';

describe('format.date', () => {
  it('should format for named types', () => {
    const m = moment('2003-06-05 7:02 PM', 'YYYY-MM-DD h:mm P');
    const FORMATS = {
      default: '06/05/2003',
      'h:mm tt': '7:02 PM',
      'M/d': '6/5',
      'M/d/yyyy': '6/5/2003',
      'MM/dd/yyyy': '06/05/2003',
      'M/d/yyyy h:mm tt': '6/5/2003 7:02 PM',
      'MM/dd/yyyy h:mm tt': '06/05/2003 7:02 PM',
      'MMMM d, yyyy': 'June 5, 2003',
      ISO: m.toISOString(),
    };
    const value = {
      moment: m,
      d: 5,
      dd: '05',
      h: 7,
      mm: '02',
      M: 6,
      MM: '06',
      MMMM: 'June',
      tt: 'PM',
      yyyy: 2003,
    };
    Object.keys(FORMATS).forEach(k => {
      expect(format[k](value)).toBe(FORMATS[k]);
    });
  });
});
