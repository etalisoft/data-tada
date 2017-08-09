# data-tada

## [API](api.md)

### [Parsers](api.parse.md)

#### `Parse.zip`

Parses ZIPs.

##### Configuration
```js
// Default configuration
// Accessible via: Parse.zip.defaults
{
  model: SyncPromise,
  required: false,
  validate: undefined,
  messages: {
    required: 'Required',
    invalid: 'Invalid',
    validate: 'Invalid',
  },
  parse, // Function signature: value => Object|undefined
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `Parse.zip({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will reject with the corresponding 'required' message.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `Object=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.
- `parse` - A function that tries to parse a ZIP.

##### Messages
You can override any or all of the default messages.  The message can be a string or a function.
```js
Parse.zip({
  messages: {
    required: 'Required.  Please enter a zip.',
    // A function can also be specified.  The signature is:  (rejectKey, rawValue) => Any
    // rejectKey would be 'validate'
    // rawValue would be the value that is being parsed by Parse.zip
    validate: (rejectKey, rawValue) => `${rawValue} cannot be 00000.`
  }
})
```

##### Result
If the input is successfully parsed it will return an object containing the zip.
```js
{
  zip: String,
  plus4: String,
  zipPlus4: String,
}
```
