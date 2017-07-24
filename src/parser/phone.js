import SyncPromise from '../SyncPromise';

const parsePhone = value => {
  if (typeof value === 'string') {
    const reg = /^\D*(1?\D*(\d{3}))?\D*(\d{3})\D*(\d{4})([^\dxX]*[xX][^\dxX]*(\d+))?\D*$/;
    const match = value.match(reg);
    if(match) {
      const [,,areaCode,local3,last4,,extension] = match;
      return {
        phone: (areaCode ? `(${areaCode}) ` : '') +
               `${local3}-${last4}` +
               (extension ? ` ext. ${extension}` : ''),
        areaCode: areaCode || null,
        local3,
        last4,
        extension: extension || null,
      };
    }
  }
  return null;
};

export default ({ model = SyncPromise, required = false, validate, parse = parsePhone } = {}) => value =>
  new model((resolve, reject) => {
    let result = value && value.toString instanceof Function ? value.toString() : value;
    if (result === null || result === undefined || result === '') {
      return required ? reject('required') : resolve(result);
    }

    result = parse(result);

    if (!result) {
      return reject('invalid');
    }

    if (validate instanceof Function && !validate(result)) {
      return reject('validate');
    }

    return resolve(result);
  });
