# data-tada

## [API](api.md)

### SyncPromise
SyncPromise is modeled after a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
This allows the convenience of the resolve/reject model with chainable `then` and `catch` functions, but with immediate
resolution.

The SyncPromise takes a resolver function as its only parameter.  If an error is raised in the resolver, `then`, or
`catch` functions the promise will be placed into a rejected state with the error as the current value.  Additionally,
an error will be thrown if the resolver function does not call resolve/reject before `then` or `catch` is invoked.

```js
import { SyncPromise } from 'data-tada';

const promise = new SyncPromise((resolve, reject) => {
  return Date.now() % 2 == 0 ? resolve('even') : reject('odd');
})
  .then(value => 'Good=' + value)
  .catch(value => 'Bad=' + value)
  .then(value => 'Hello, ' + value);
```

-----
#### Retrieving the value/status
In addition to the `then` and `catch` functions, the SyncPromise object also supports the `value` function.

##### `.value()`
Calling the `value` method without any parameters returns the current value.
```js
// const promise = new SyncPromise(...);
const value = promise.value();
```

##### `.value(Function)`
Calling the `value` method and passing a function allows you to inspect the status/value and return the value of your choosing.  Function signature: `({ status, value })=>Any`
```js
// const promise = new SyncPromise(...);
const errorOnly = ({ status, value }) => {
  if(status === 'resolved') {
    return '';
  } else { // status === 'rejected'
    return value;
  }
}
const value = promise.value(errorOnly)
```

The `value` method does not alter the internal value of the SyncPromise.
```js
const promise = new SyncPromise(resolve => resolve(1)); // 1
promise.then(v => v * 10); // 10
let value = promise.value(({ value }) => value.toString(2)); // '1010'
promise.then(v => v + 13); // 23
```

-----
#### Example: Acronym Parser
###### Creating the parser
```js
import SyncPromise from 'data-tada';
const acronymParser = value => new SyncPromise((resolve, reject) => {
  if(!value) return reject('required');
  if(typeof value !== 'string') reject('invalid');
  const match = value.match(/[A-Z]{2,}/);
  if(!match) return reject('missing');
  const acronym = match[0];
  return resolve(acronym);
});
```

###### Parsing a string
```js
acronymParser(false).value(); // 'required'
acronymParser(3.141).value(); // 'invalid'
acronymParser('I left my gear at home.').value(); // 'missing'
acronymParser('I forgot my SCUBA gear!').value(); // 'SCUBA'
```

###### Validating a string
If you only want to parse the string for validity in order to display a friendly error message, you could do the following.
```js
const ACRONYM_ERROR = {
  required: 'Required.  Type some stuff and things!',
  invalid: 'Invalid.  Must be a string.',
  missing: 'You typed stuff, but not an acronym.'
};
const error = acronymParser('')
  .catch(({ status, value }) => status == 'rejected' ? ACRONYM_ERROR[status] : '');
// error would contain: 'Required.  Type some stuff and things!'
```

###### Formatting/Transforming the acronym
```js
import React from 'react';
const link = arconymParser('SCUBA')
  .then(s => ({ lower: s.toLowerCase(), upper: s.toUpperCase() })
  .then(o => ({ ...o, url: `https://en.wiktionary.org/wiki/${o.lower}` }))
  .then(({ url, upper }) => <a href={url}>{upper}</a>)
  .value()
```
This is a bit of a contrived example, but here we parse 'SCUBA' and then it transforms through each `then` function:
```js
'SCUBA'
{ lower: 'scuba', upper: 'scuba' }
{ lower: 'scuba', upper: 'scuba', url: 'https://en.wiktionary.org/wiki/scuba' }
<a href="https://en.wiktionary.org/wiki/scuba">SCUBA</a>
```
