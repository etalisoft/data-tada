# data-tada

## [API](api.md)

### [Parsers](api.parse.md)

#### `Parse.string`

Parses strings.

##### Configuration
```js
// Default configuration:
// Accessible via: Parse.string.defaults
{
  model: SyncPromise,
  trim: true,
  required: false,
  minLength: 0,
  maxLength: Number.MAX_VALUE,
  regex = undefined,
  notRegex: undefined,
  validate: undefined,
  messages: {
    required: 'Required',
    invalid: 'Invalid',
    minLength: 'Too Short',
    maxLength: 'Too Long',
    regex: 'Invalid',
    notRegex: 'Invalid',
    validate: 'Invalid',
  },
  parse, // Function signature: value => String|undefined
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `Parse.string({ model: Promise })`
- `trim` - Whether to trim the value.  Trimming occurs before rejections.
- `required` - Rejectable.  If required=true and the input is falsy the promise will reject with the corresponding 'required' message.
- `minLength` - Rejectable.  If the string < minLength characters the promise will reject with the corresponding 'minLength' message.
- `maxLength` - Rejectable.  If the string > maxLength characters the promise will reject with the corresponding 'maxLength' message.
- `regex` - Rejectable.  If the string does not match the regex the promise will reject with the corresponding 'regex' message.
- `notRegex` - Rejectable.  If the string matches the notRegex the promise will reject with the corresponding 'notRegex' message.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `String=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.
- `parse` - A function that tries to parse a string.

##### Messages
You can override any or all of the default messages.  The message can be a string or a function.
```js
Parse.string({
  messages: {
    required: 'Required.  Please enter a comment.',
    // A function can also be specified.  The signature is:  (rejectKey, rawValue) => Any
    // rejectKey would be 'maxLength'
    // rawValue would be the value that is being parsed by Parse.string
    maxLength: (rejectKey, rawValue) => `250 characters max.  ${rawValue.length}/250`
  }
})
```

##### Result
If the input is successfully parsed it will return the string.
