# data-tada

## [API](api.md)

### Parser

#### `parser.email`

Parses emails.

##### Configuration
```js
// Default configuration:
{
  model = SyncPromise,
  required = false,
  minLength = 0,
  maxLength = Number.MAX_VALUE,
  regex = <W3C Email Regex>,
  notRegex = undefined,
  validate = undefined,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `parser.email({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will `reject('required')`.
- `minLength` - Rejectable.  If the email < minLength characters the promise will `reject('minLength')`.
- `maxLength` - Rejectable.  If the email > maxLength characters the promise will `reject('maxLength')`.
- `regex` - Rejectable.  If the email does not match the regex the promise will `reject('regex')`.  The default value is the regex pattern specified by the [W3C input[type=email]](https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html).
- `notRegex` - Rejectable.  If the email matches the notRegex the promise will `reject('notRegex')`.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will `reject('validate')`.  Function signature: `(date)=>Boolean`.

##### Result
If the input is successfully parsed it will return an object containing the email, and properties containing common date/time fragments.
```js
{
  email: String,
  user: String,
  domain: String,
}
```
