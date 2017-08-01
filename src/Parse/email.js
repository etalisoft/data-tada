import SyncPromise from '../SyncPromise';

import format from '../Format/email';
import createStringParser from './string';

// http://emailregex.com/
const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (
  {
    model = SyncPromise,
    required = false,
    minLength = 0,
    maxLength = Number.MAX_VALUE,
    regex = regEmail,
    notRegex,
    validate,
    messages,
  } = {}
) =>
  createStringParser({ model, required, minLength, maxLength, regex, notRegex, validate, messages }).then(email =>
    format.new(email || '')
  );
