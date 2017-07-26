# data-tada

## [API](api.md)

### Parser

#### `parser.ssn`

Parses SSNs.

##### Configuration
```js
// Default configuration:
{
  model = SyncPromise,
  required = false,
  validate = undefined,
  parse = parseSsn,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `parser.ssn({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will `reject('required')`.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will `reject('validate')`.  Function signature: `(date)=>Boolean`.
- `parse` - A function that tries to parse a SSN.

##### Result
If the input is successfully parsed it will return an object containing the SSN.
```js
{
  ssn: String,
  first3: String,
  middle2: String,
  last4: String,
}
```
