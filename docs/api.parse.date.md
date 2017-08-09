# data-tada

## [API](api.md)

### [Parsers](api.parse.md)

#### `Parse.date`

Parses dates using the [Moment.js library](https://momentjs.com/).

##### Configuration
```js
// Default configuration:
// Accessible via: Parse.date.defaults
{
  model: SyncPromise,
  required: false,
  min: undefined,
  max: undefined,
  validate: undefined,
  messages: {
    required: 'Required',
    invalid: 'Invalid',
    min: 'Too Early',
    max: 'Too Late',
    validate: 'Invalid',
  },
  parse, // Function signature: (value, ...args) => moment,
  formats: ['MMM D, YYYY', 'L', moment.ISO_8601],
  args: undefined,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `Parse.date({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will reject with the corresponding 'required' message.
- `min` - Rejectable.  If min is specified and input < min the promise will reject with the corresponding 'min' message.  The value can be: 'now', 'today', a value supported by [moment](https://momentjs.com/docs/#/parsing/).  The value can also be a function that returns one of the acceptable values.
- `max` - Rejectable.  If max is specified and input > max the promise will reject with the corresponding 'max' message.  The value can be: 'now', 'today', a value supported by moment.  The value can also be a function that returns one of the acceptable values.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `moment=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.
- `parse` - A function that parses a value into a moment.
- `formats` - The [moment string+formats](https://momentjs.com/docs/#/parsing/string-formats/) used for parsing strings.
- `args` - Array of any additional args to pass to the [moment parser](https://momentjs.com/docs/#/parsing/).

##### Messages
You can override any or all of the default messages.  The message can be a string or a function.
```js
Parse.date({
  messages: {
    required: 'Required.  Please enter a date.',
    // A function can also be specified.  The signature is:  (rejectKey, rawValue) => Any
    // rejectKey would be 'min'
    // rawValue would be the value that is being parsed by Parse.date
    min: (rejectKey, rawValue) => `${rawValue} cannot be before 1900.`
  }
})
```

##### Result
If the input is successfully parsed it will return a moment object.
