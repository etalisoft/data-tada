# data-tada

# [API](api.md)

# SyncPromise
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
promise.status; // 'resolved' - In both the even and odd cases the end result will be a resolved promise.
promise.value; // Two posibilities: 'Hello, Good=even' or 'Hello, Bad=odd'
```
