# data-tada

## [API](api.md)

### [Parsers](api.parse.md)

#### `Parse.email`

Parses emails.

##### Configuration
```js
// Default configuration:
{
  model: SyncPromise,
  required: false,
  minLength: 0,
  maxLength: Number.MAX_VALUE,
  regex: <W3C Email Regex>,
  notRegex: undefined,
  validate: undefined,
  messages: {
    required: 'Required',
    minLength: 'Too Short',
    maxLength: 'Too Long',
    regex: 'Invalid',
    notRegex: 'Invalid',
    validate: 'Invalid',
  },
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `Parse.email({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will reject with the corresponding 'required' message.
- `minLength` - Rejectable.  If the email < minLength characters the promise will reject with the corresponding 'minLength' message.
- `maxLength` - Rejectable.  If the email > maxLength characters the promise will reject with the corresponding 'maxLength' message.
- `regex` - Rejectable.  If the email does not match the regex the promise will reject with the corresponding 'regex' message.  The default value is the regex pattern specified by the [W3C input[type=email]](https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html).
- `notRegex` - Rejectable.  If the email matches the notRegex the promise will reject with the corresponding 'notRegex' message.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `(date)=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.

##### Messages
You can override any or all of the default messages.  The message can be a string or a function.
```js
Parse.email({
  messages: {
    required: 'Required.  Please enter an email.',
    // A function can also be specified.  The signature is:  (rejectKey, rawValue) => Any
    // rejectKey would be 'minLength'
    // rawValue would be the value that is being parsed by Parse.email
    minLength: (rejectKey, rawValue) => `${rawValue} must be at least 10 characters.`
  }
})
```

##### Result
If the input is successfully parsed it will return an object containing the email, and properties containing common date/time fragments.
```js
{
  email: String,
  user: String,
  domain: String,
}
```
