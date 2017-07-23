import SyncPromise from '../SyncPromise';

const reg = /^1?(\d{3})?(\d{3})(\d{4})$/;

export default (PromiseModel = SyncPromise) => (value, defaultAreaCode) =>
  new PromiseModel((resolve, reject) => {
    if (typeof value === 'string') {
      const match = value.replace(/\D/g, '').match(reg);
      if (match) {
        const areaCode = match[1] || defaultAreaCode;
        if (areaCode) {
          const middle3 = match[2];
          const last4 = match[3];
          const local = middle3 + last4;
          return resolve({
            phone: areaCode + local,
            areaCode,
            local,
            last4,
            parts: [areaCode, middle3, last4],
          });
        }
      }
    }
    return reject();
  });
