import SyncPromise from '../SyncPromise';

export default (
  { model = SyncPromise, required = false, minLength = 0, maxLength = Number.MAX_VALUE, regex, notRegex, validate } = {}
) => value =>
  new model((resolve, reject) => {
    let result = value && value.toString instanceof Function ? value.toString() : value;

    if (result === null || result === undefined || result === '') {
      return required ? reject('required') : resolve(result);
    }

    if (minLength && result.length < minLength) {
      return reject('minLength');
    }

    if (result.length > maxLength) {
      return reject('maxLength');
    }

    if (regex && !regex.test(result)) {
      return reject('regex');
    }

    if (notRegex && notRegex.test(result)) {
      return reject('notRegex');
    }

    if (validate instanceof Function && !validate(result)) {
      return reject('validate');
    }

    return resolve(result);
  });
