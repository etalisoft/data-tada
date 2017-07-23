import moment from 'moment';

import SyncPromise from '../SyncPromise';

const FORMATS = ['MM/DD/YYYY', moment.ISO_8601];

export default (PromiseModel = SyncPromise) => (value, format = FORMATS, ...args) =>
  new PromiseModel((resolve, reject) => {
    let result = moment(value, format, ...args);
    if (result.isValid()) {
      return resolve({
        moment: result,
        date: result.toDate(),
        // day
        d: result.format('D'),
        dd: result.format('DD'),
        // weekday
        ddd: result.format('ddd'),
        dddd: result.format('dddd'),
        // fraction of second
        f: result.format('S'),
        ff: result.format('SS'),
        fff: result.format('SSS'),
        ffff: result.format('SSSS'),
        // hour (12-hour clock)
        h: result.format('h'),
        hh: result.format('hh'),
        // hour (24-hour clock)
        H: result.format('H'),
        HH: result.format('HH'),
        // minute
        m: result.format('m'),
        mm: result.format('mm'),
        // month
        M: result.format('M'),
        MM: result.format('MM'),
        // month name
        MMM: result.format('MMM'),
        MMMM: result.format('MMMM'),
        // AM/PM
        tt: result.format('A'),
        // year
        yy: result.format('YY'),
        yyyy: result.format('YYYY'),
        // time zone
        z: result.format('Z'),
      });
    }
    return reject();
  });
