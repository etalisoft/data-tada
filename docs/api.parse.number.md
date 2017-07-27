# data-tada

## [API](api.md)

### Parse

#### `Parse.number`

Parses numbers.

##### Configuration
```js
// Default configuration:
{
  model = SyncPromise,
  required = false,
  min = Number.NEGATIVE_INFINITY,
  max = Number.MAX_VALUE,
  validate = undefined,
  messages = {
    required = 'Required',
    invalid = 'Invalid',
    min = 'Too Low',
    max = 'Too High',
    validate = 'Invalid',
  }
  parse = tryParseFloat,
  scrub = scrubFloat,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `Parse.number({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will reject with the corresponding 'required' message.
- `min` - Rejectable.  If the number < min the promise will reject with the corresponding 'min' message.
- `max` - Rejectable.  If the number > max the promise will reject with the corresponding 'max' message.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `(date)=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.
- `parse` - A function that returns the parsed number, or the original value if parsing fails.
- `scrub` - A function that removes non-numeric characters from the string before attempting to reparse.

##### Messages
You can override any or all of the default messages.  The message can be a string or a function.
```js
Parse.number({
  messages: {
    required: 'Required.  Please enter a number.',
    // A function can also be specified.  The signature is:  (rejectKey, rawValue) => Any
    // rejectKey would be 'min'
    // rawValue would be the value that is being parsed by Parse.number
    min: (rejectKey, rawValue) => `${rawValue} must be at least 123.`
  }
})
```

##### Result
If the input is successfully parsed it will return the number.
