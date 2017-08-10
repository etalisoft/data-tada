# data-tada

## [API](api.md)

### [Parsers](api.parse.md)

#### `Parse.password`

Parses passwords.

##### Configuration
```js
// Default configuration:
// Accessible via: Parse.password.defaults
{
  model: SyncPromise,
  trim: false,
  required: false,
  minLength: 8,
  maxLength: 50,
  minLower: 1,
  maxLower: Number.MAX_VALUE,
  minUpper: 1,
  maxUpper: Number.MAX_VALUE,
  minDigit: 1,
  maxDigit: Number.MAX_VALUE,
  minSymbol: 1,
  maxSymbol: Number.MAX_VALUE,
  minNonPrint: 0,
  maxNonPrint: 0,
  minAsciiExtended: 0,
  maxAsciiExtended: 0,
  minUnicode: 0,
  maxUnicode: 0,
  regex, // Password regex
  notRegex: undefined,
  validate: undefined,
  messages: {
    required: 'Required',
    invalid: 'Invalid',
    minLength: 'Too Short',
    maxLength: 'Too Long',
    minLower: 'Too Few a-z',
    maxLower: 'Too Many a-z',
    minUpper: 'Too Few A-Z',
    maxUpper: 'Too Many A-Z',
    minDigit: 'Too Few 0-9',
    maxDigit: 'Too Many 0-9',
    minSymbol: 'Too Few Symbols',
    maxSymbol: 'Too Many Symbols',
    minNonPrint: 'Invalid',
    maxNonPrint: 'Invalid',
    minAsciiExtended: 'Invalid',
    maxAsciiExtended: 'Invalid',
    minUnicode: 'Invalid',
    maxUnicode: 'Invalid',
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
- `minLower` - Rejectable.  If the password contains more than minLower a-z characters the promise will reject with the corresponding 'minLower' message.
- `maxLower` - Rejectable.  If the password contains less than maxLower a-z characters the promise will reject with the corresponding 'maxLower' message.
- `minUpper` - Rejectable.  If the password contains more than minUpper A-Z characters the promise will reject with the corresponding 'minUpper' message.
- `maxUpper` - Rejectable.  If the password contains less than maxUpper A-Z characters the promise will reject with the corresponding 'maxUpper' message.
- `minDigit` - Rejectable.  If the password contains more than minDigit 0-9 characters the promise will reject with the corresponding 'minDigit' message.
- `maxDigit` - Rejectable.  If the password contains less than maxDigit 0-9 characters the promise will reject with the corresponding 'maxDigit' message.
- `minSymbol` - Rejectable.  If the password contains more than minSymbol symbol characters the promise will reject with the corresponding 'minSymbol' message.
- `maxSymbol` - Rejectable.  If the password contains less than maxSymbol symbol characters the promise will reject with the corresponding 'maxSymbol' message.
- `minNonPrint` - Rejectable.  If the password contains more than minNonPrint non-printable characters the promise will reject with the corresponding 'minNonPrint' message.
- `maxNonPrint` - Rejectable.  If the password contains less than maxNonPrint non-printable characters the promise will reject with the corresponding 'maxNonPrint' message.
- `minAsciiExtended` - Rejectable.  If the password contains more than minAsciiExtended extended ASCII characters the promise will reject with the corresponding 'minAsciiExtended' message.
- `maxAsciiExtended` - Rejectable.  If the password contains less than maxAsciiExtended extended ASCII characters the promise will reject with the corresponding 'maxAsciiExtended' message.
- `minUnicode` - Rejectable.  If the password contains more than minUnicode Unicode characters the promise will reject with the corresponding 'minUnicode' message.
- `maxUnicode` - Rejectable.  If the password contains less than maxUnicode Unicode characters the promise will reject with the corresponding 'maxUnicode' message.
- `regex` - Rejectable.  If the string does not match the regex the promise will reject with the corresponding 'regex' message.  The default regex requires lowercase, uppercase, digit, and special characters.  It also requires only printable ASCII characters.
- `notRegex` - Rejectable.  If the string matches the notRegex the promise will reject with the corresponding 'notRegex' message.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `Object=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.
- `parse` - A function that tries to parse a string.

##### Messages
You can override any or all of the default messages.  The message can be a string or a function.
```js
Parse.password({
  messages: {
    required: 'Required.  Please enter a password.',
    // A function can also be specified.  The signature is:  (rejectKey, rawValue) => Any
    // rejectKey would be 'maxLength'
    // rawValue would be the value that is being parsed by Parse.password
    maxLength: (rejectKey, rawValue) => `25 characters max.  ${rawValue.length}/25`
  }
})
```

##### Result
If the input is successfully parsed it will return an object containing the password, and properties containing common password details.
```js
{
  password: String,
  ascii: Number,
  asciiExtended: Number,
  nonPrint: Number,
  unicode: Number,
  lower: Number,
  upper: Number,
  digit: Number,
  symbol: Number,
}
```
