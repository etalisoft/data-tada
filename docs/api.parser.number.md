# data-tada

## [API](api.md)

### Parser

#### `parser.number`

Parses numbers.

##### Configuration
```js
// Default configuration:
{
  model = SyncPromise,
  required = false,
  min = Number.NEGATIVE_INFINITY,
  max = Number.MAX_VALUE,
  validate = undefined,
  parse = tryParseFloat,
  scrub = scrubFloat,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `parser.number({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will `reject('required')`.
- `min` - Rejectable.  If the number < min the promise will `reject('min')`.
- `max` - Rejectable.  If the number > max the promise will `reject('max')`.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will `reject('validate')`.  Function signature: `(date)=>Boolean`.
- `parse` - A function that returns the parsed number, or the original value if parsing fails.
- `scrub` - A function that removes non-numeric characters from the string before attempting to reparse.

##### Result
If the input is successfully parsed it will return the number.
