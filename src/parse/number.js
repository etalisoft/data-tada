import SyncPromise from '../SyncPromise';

export default (PromiseModel = SyncPromise) => value =>
  new PromiseModel((resolve, reject) => {
    let result = parseFloat(value);
    if (isNaN(result) && typeof value === 'string') {
      result = parseFloat(value.replace(/[^-\d\.]/g, ''));
    }
    return isNaN(result) ? reject() : resolve(result);
  });
