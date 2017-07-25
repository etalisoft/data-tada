# data-tada

## Getting Started

### Parsing data
```js
import { parser } from 'data-tada';

// Step 1: Create an email parser
const emailParser = parser.email();

// Step 2: Pass a value to it
const promise = emailParser('john@doe.com');
```

The parser is modeled after promises.  This means you can chain `then()` and `catch()` methods to further process the
data. By default the parsers do not use a normal `Promise` object though.  Instead they use
[SyncPromise](api.sync-promise.md), which resolves immediately.  In addition to `then` and `catch` methods,
SyncPromise also provides the `value` and `status` properties.

```js
const goodEmail = emailParser('john@doe.com');
goodEmail.status; // 'resolved'
goodEmail.value;  // { email: 'john@doe.com', user: 'john', domain: 'doe.com' }

const badEmail = emailParser('not an email');
badEmail.status; // 'rejected'
badEmail.value;  // 'invalid'
```

### Formatting Data
You can use `then` methods to transform/format data.  Format functions are pure functions.  Some default format
functions have been provided in the `format` object.
```js
import { parser, formatter } from 'data-tada';

const emailParser = parser.email();

const result = emailParser('john@doe.com').then(format.email.mask);
result.status; // 'resolved'
result.value;  // '****@doe.com'

// Custom format function for reversing a string
const reverse = str => str.split('').reverse().join('');
const another = emailParser('john@doe.com').then(reverse);
result.status; // 'resolved'
result.value;  // 'moc.eod@nhoj'
```

### Validating Data
The parsers support additional configuration that can be used to further resolve/reject data when it is being parsed.
```js
import { parser } from 'data-tada';

const passwordParser = parser.string({
  required: true,
  minLength: 8,
  maxLength: 20,
  regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
  notRegex: /password/i,
  validate: str => str.includes('123'),
});

/*
Invalid data is rejected with the reason ('required', 'minLength', ..., 'validate').
Because the errors are predictable, the `catch` function can be used to generate error messages.
*/
const PASSWORD_ERROR = {
  required: 'The password field is required.',
  minLength: 'The password must be 8 characters or more.',
  maxLength: 'The password must be 20 characters or less.',
  regex: 'The password must contain a digit, lowercase, and upper case letters.',
  notRegex: 'The password cannot contain the word "password".',
  validate: 'The password cannot contain "123".',
};
const password = document.getElementById('password').value;
// If we wanted to parse the password and retrieve the error message if invalid, or an empty string if valid
// we could do the following.
const passwordError = passwordParser(password)
  .then(str => '') // successfully parsed?  Just return empty string
  .catch(error => PASSWORD_ERROR[error]) // error?  return the appropriate error message
  .value;
```
