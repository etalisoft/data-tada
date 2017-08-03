# data-tada

## [API](api.md)

### [Parsers](api.parse.md)

#### `Parse.phone`

Parses phones.

##### Configuration
```js
// Default configuration
// Accessible via: Parse.phone.defaults
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

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `Parse.phone({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will reject with the corresponding 'required' message.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `(date)=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.
- `parse` - A function that tries to parse US phone numbers.

##### Messages
You can override any or all of the default messages.  The message can be a string or a function.
```js
Parse.phone({
  messages: {
    required: 'Required.  Please enter a phone number.',
    // A function can also be specified.  The signature is:  (rejectKey, rawValue) => Any
    // rejectKey would be 'validate'
    // rawValue would be the value that is being parsed by Parse.phone
    validate: (rejectKey, rawValue) => `${rawValue} cannot be a 1-800 number.`
  }
})
```

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
