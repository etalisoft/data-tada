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
const addShippingHandling = ({ status, value }) => {
  if(status === 'resolved') {
    return value + shipping + handling;
  } else {
    return -1;
  }
}
const value = promise.value(addShippingHandling);
```

The `value` method does not alter the internal value of the SyncPromise.
```js
const promise = new SyncPromise(resolve => resolve(1)); // 1
promise.then(v => v * 10); // 10
let value = promise.value(({ value }) => value.toString(2)); // '1010'
promise.then(v => v + 13); // 23
```

##### `.value.resolved()`
Calling the `value.resolved` method will return the value only if the current status is 'resolved'; otherwise it will return `undefined`.
```js
const resolvedPromise = new SyncPromise(resolve => resolve(1))
resolvedPromise.value.resolved(); // 1

const rejectedPromise = new SyncPromise((resolve, reject) => reject(2));
rejectedPromise.value.resolved(); // undefined
```

##### `.value.rejected()`
Calling the `value.rejected` method will return the value only if the current status is 'rejected'; otherwise it will return `undefined`.
```js
const resolvedPromise = new SyncPromise(resolve => resolve(1))
resolvedPromise.value.rejected(); // undefined

const rejectedPromise = new SyncPromise((resolve, reject) => reject(2));
rejectedPromise.value.rejected(); // 2
```
