# data-tada

## [API](api.md)

### [Parsers](api.parse.md)

#### `Parse.ssn`

Parses SSNs.

##### Configuration
```js
// Default configuration:
// Accessible via: Parse.ssn.defaults
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

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `Parse.ssn({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will reject with the corresponding 'required' message.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `(date)=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.
- `parse` - A function that tries to parse a SSN.

##### Messages
You can override any or all of the default messages.  The message can be a string or a function.
```js
Parse.ssn({
  messages: {
    required: 'Required.  Please enter an SSN.',
    // A function can also be specified.  The signature is:  (rejectKey, rawValue) => Any
    // rejectKey would be 'validate'
    // rawValue would be the value that is being parsed by Parse.ssn
    validate: (rejectKey, rawValue) => `${rawValue} cannot start with 666.`
  }
})
```

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
