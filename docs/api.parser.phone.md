# data-tada

## [API](api.md)

### Parser

#### `parser.phone`

Parses phones.

##### Configuration
```js
// Default configuration
{
  model = SyncPromise,
  required = false,
  validate = undefined,
  parse = parsePhone,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `parser.phone({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will `reject('required')`.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will `reject('validate')`.  Function signature: `(date)=>Boolean`.
- `parse` - A function that tries to parse US phone numbers.

##### Result
If the input is successfully parsed it will return an object containing the phone.
```js
{
  phone: String,
  areaCode: String|null,
  local3: String,
  last4: String,
  extension: String|null,
}
```
