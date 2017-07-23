import SyncPromise from '../SyncPromise';

export default (PromiseModel = SyncPromise) => value =>
  new PromiseModel((resolve, reject) => {
    if (typeof value === 'string') {
      return resolve(value);
    } else if (value === undefined || value === null) {
      return resolve('');
    } else if (!(value instanceof Function) && value.toString instanceof Function) {
      return resolve(value.toString());
    }
    return reject();
  });
