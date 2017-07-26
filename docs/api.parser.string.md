# data-tada

## [API](api.md)

### Parser

#### `parser.string`

Parses strings.

##### Configuration
```js
// Default configuration:
{
  model = SyncPromise,
  required = false,
  minLength = 0,
  maxLength = Number.MAX_VALUE,
  regex = undefined,
  notRegex = undefined,
  validate = undefined,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `parser.string({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will `reject('required')`.
- `minLength` - Rejectable.  If the string < minLength characters the promise will `reject('minLength')`.
- `maxLength` - Rejectable.  If the string > maxLength characters the promise will `reject('maxLength')`.
- `regex` - Rejectable.  If the string does not match the regex the promise will `reject('regex')`.
- `notRegex` - Rejectable.  If the string matches the notRegex the promise will `reject('notRegex')`.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will `reject('validate')`.  Function signature: `(date)=>Boolean`.

##### Result
If the input is successfully parsed it will return the string.
