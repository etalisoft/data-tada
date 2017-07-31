import expect from 'expect';
import moment from 'moment';

import format from '../date';

describe('format.date', () => {
  it('should format for named types', () => {
    const m = moment('2003-06-05 7:02 PM', 'YYYY-MM-DD h:mm P');
    const js = m.toDate();
    const FORMATS = {
      default: '06/05/2003',
      moment: m,
      jsDate: js,
      ISO: m.toISOString(),
      localeDateShort: m.format('l'),
      localeDate: m.format('L'),
      localeTimeShort: m.format('LT'),
      localeTime: m.format('LTS'),
      'h:mm A': '7:02 PM',
      'M/D': '6/5',
      'M/D/YYYY': '6/5/2003',
      'MM/DD/YYYY': '06/05/2003',
      'M/D/YYYY h:mm A': '6/5/2003 7:02 PM',
      'MM/DD/YYYY h:mm A': '06/05/2003 7:02 PM',
      'MMMM D, YYYY': 'June 5, 2003',
    };
    const value = {
      moment: m,
      date: js,
      A: 'PM',
      D: 5,
      DD: '05',
      h: 7,
      l: m.format('l'),
      L: m.format('L'),
      LT: m.format('LT'),
      LTS: m.format('LTS'),
      mm: '02',
      M: 6,
      MM: '06',
      MMMM: 'June',
      YYYY: 2003,
    };
    Object.keys(FORMATS).forEach(k => {
      expect(format[k](value)).toBe(FORMATS[k], k);
    });
  });
});
