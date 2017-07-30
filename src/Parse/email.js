import SyncPromise from '../SyncPromise';

import createStringParser from './string';

// https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html
const w3cEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (
  {
    model = SyncPromise,
    required = false,
    minLength = 0,
    maxLength = Number.MAX_VALUE,
    regex = w3cEmail,
    notRegex,
    validate,
    messages,
  } = {}
) =>
  createStringParser({ model, required, minLength, maxLength, regex, notRegex, validate, messages }).then(email => {
    if (!email) {
      return email;
    }

    const [user, domain] = email.split('@');
    return { email, user, domain };
  });
