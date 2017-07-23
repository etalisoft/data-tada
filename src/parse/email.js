import SyncPromise from '../SyncPromise';

// W3C input type=email regular expression: https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html
const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (PromiseModel = SyncPromise) => value =>
  new PromiseModel((resolve, reject) => {
    if (typeof value === 'string') {
      const match = value.match(reg);
      if (match) {
        const email = match[0];
        const parts = email.split('@');
        return resolve({
          email,
          user: parts[0],
          domain: parts[1],
        });
      }
    }
    return reject();
  });
