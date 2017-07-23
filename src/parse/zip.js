import SyncPromise from '../SyncPromise';

const reg = /^(\d{5})(\d{4})?$/;

export default (PromiseModel = SyncPromise) => value =>
  new PromiseModel((resolve, reject) => {
    if (typeof value === 'string') {
      let match = value.replace(/\D/g, '').match(reg);
      if (match) {
        const zip = match[1];
        const plus4 = match[2] || '';
        return resolve({
          zip,
          plus4,
          zipPlus4: plus4 ? `${zip}-${plus4}` : zip,
        });
      }
    }
    return reject();
  });
