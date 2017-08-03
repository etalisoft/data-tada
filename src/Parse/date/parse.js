import moment from 'moment';

export default (value, ...args) => {
  let result = value instanceof Function ? value() : value;

  if (result instanceof moment) {
    return result;
  }

  if (result === 'now' || result === false) {
    return moment();
  }

  if (result === 'today') {
    return moment().startOf('day');
  }

  if (typeof result === 'string') {
    const m = moment(result, ...args);
    return m.isValid() ? m : moment(result);
  }

  return moment(result);
};
