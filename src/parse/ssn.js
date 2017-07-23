import SyncPromise from '../SyncPromise';

const reg = /^(\d{3})(\d{2})(\d{4})$/;

export default (PromiseModel = SyncPromise) => value =>
  new PromiseModel((resolve, reject) => {
    if (typeof value === 'string') {
      const match = value.replace(/\D/g, '').match(reg);
      if (match) {
        return resolve({
          ssn: `${match[1]}-${match[2]}-${match[3]}`,
          first3: match[1],
          middle2: match[2],
          last4: match[3],
        });
      }
    }
    return reject();
  });
