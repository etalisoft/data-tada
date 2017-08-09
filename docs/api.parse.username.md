# data-tada

## [API](api.md)

### [Parsers](api.parse.md)

#### `Parse.username`

Parses usernames.  This is an alias for Parse.string but with different defaults (notably `minLength`,
`maxLength`, and `regex`).

##### Configuration
```js
// Default configuration:
// Accessible via: Parse.username.defaults
{
  model: SyncPromise,
  trim: true,
  required: false,
  minLength: 4,
  maxLength: 25,
  regex = /^[a-z][\w.-]*$/,
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
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `(date)=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.
- `parse` - A function that tries to parse a string.

##### Messages
You can override any or all of the default messages.  The message can be a string or a function.
```js
Parse.username({
  messages: {
    required: 'Required.  Please enter a username.',
    // A function can also be specified.  The signature is:  (rejectKey, rawValue) => Any
    // rejectKey would be 'maxLength'
    // rawValue would be the value that is being parsed by Parse.string
    maxLength: (rejectKey, rawValue) => `25 characters max.  ${rawValue.length}/25`
  }
})
```

##### Result
If the input is successfully parsed it will return the username string.
