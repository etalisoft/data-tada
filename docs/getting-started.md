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
SyncPromise also provides the `value` function.

```js
const goodEmail = emailParser('john@doe.com');
// calling value() will return the current value.
goodEmail.value(); // { email: 'john@doe.com', user: 'john', domain: 'doe.com' }
// calling value(fn) will let you preview the status/value and return a value.
goodEmail.value(result => {
  result.status; // 'resolved';
  result.value;  // { email: 'john@doe.com', user: 'john', domain: 'doe.com' }
  return result.value.email;
}); // 'john@doe.com'
// calling value.resolved() will return the value only if the status is currently 'resolved'
goodEmail.value.resolved(); // { email: 'john@doe.com', user: 'john', domain: 'doe.com' }
// calling value.rejected() will return the value only if the status is currently 'rejected'
goodEmail.value.rejected(); // undefined

const badEmail = emailParser('not an email');
badEmail.value(); // 'Invalid'
badEmail.value(result => {
  result.status; // 'rejected'
  result.value; // 'Invalid';
  return result.value;
}); // 'Invalid'
goodEmail.value.resolved(); // undefined
goodEmail.value.rejected(); // 'Invalid'
```

### Formatting Data
You can use `then` methods to transform/format data.  Format functions are pure functions.  Some default format
functions have been provided in the `format` object.
```js
import { parser, format } from 'data-tada';

const emailParser = parser.email();

emailParser('john@doe.com').then(format.email.mask).value(result => {
  result.status; // 'resolved'
  result.value;  // '****@doe.com'
});

// Custom format function for reversing a string
const reverseEmail = ({ email }) => email.split('').reverse().join('');
emailParser('john@doe.com').then(reverseEmail).value(result => {
  result.status; // 'resolved'
  result.value;  // 'moc.eod@nhoj'
});
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
  validate: str => !str.includes('123'),
  messages: {
    required: 'Required. Please enter a password.',
    minLength: 'Password must be at least 8 characters.',
    regex: 'Password must contain a digit, lowercase, and uppercase.',
    validate: 'Password cannot contain 123.',
  },
});

const password = document.getElementById('password').value;
// If we wanted to parse the password and retrieve the error message if invalid, or an empty string if valid
// we could do the following.
const passwordError = passwordParser(password).value.rejected();
```
