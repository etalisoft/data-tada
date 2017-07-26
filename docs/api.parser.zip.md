# data-tada

## [API](api.md)

### Parser

#### `parser.zip`

Parses ZIPs.

##### Configuration
```js
// Default configuration
{
  model = SyncPromise,
  required = false,
  validate = undefined,
  parse = parseZip,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `parser.zip({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will `reject('required')`.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will `reject('validate')`.  Function signature: `(date)=>Boolean`.
- `parse` - A function that tries to parse US phone numbers.

##### Result
If the input is successfully parsed it will return an object containing the zip.
```js
{
  zip: String,
  plus4: String,
  zipPlus4: String,
}
```
