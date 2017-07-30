# data-tada

## [API](api.md)

### Parsers

The provided parsers take an optional configuration object as their first parameter.
```js
import { Parse } from 'data-tada';
const defaultParser = Parse.email();
const customParser = Parse.email({ required: true, notRegex: /@aol\.com^/i });
```

The configured parser is a function that takes a single value and returns, by default, a [SyncPromise](api.sync-promise.md) object.

```js
import { Parse } from 'data-tada';
const parser = Parse.string({ required: true, minLength: 5 });
const value = document.getElementById('input').value;
const promise = parser(value) // As an example, we will evaluate ABC and ABCDE as the value.
  .catch(v => 'Unspecified') // ABC->Unspecified, ABCDE would not step into this
  .then(v => v.toLowerCase()); // Unspecified->unspecified, ABCDE->abcde
const result = promise.value(); // Either unspecified or abcde
```

The provided parsers also allow you to add `then()` and `catch()` functions to the configured parser BEFORE parsing.

```js
import { Parse } from 'data-tada';
const parser = Parse.string({ required: true, minLength: 5 })
  .catch(v => 'Unspecified')
  .then(v => v.toLowerCase());
const value = document.getElementById('input').value;
const promise = parser(value)
  .then(v => `Value: ${v}`);
const result = promise.value();
// 'ABC'->'Value: unspecified', 'ABCDE'->'Value: abcde'
```

#### Creating a New Parser
If you are interested in creating your own custom parser, [click here](api.create-parser.md).
