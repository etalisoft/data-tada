# data-tada

## [API](api.md)

### Parse

#### `Parse.date`

Parses dates using the [Moment.js library](https://momentjs.com/).

##### Configuration
```js
// Default configuration:
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
  formats: ['L', moment.ISO_8601],
  ...args,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `Parse.date({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will reject with the corresponding 'required' message.
- `min` - Rejectable.  If min is specified and input < min the promise will reject with the corresponding 'min' message.  The value can be: 'now', 'today', a value supported by [moment](https://momentjs.com/docs/#/parsing/).  The value can also be a function that returns one of the acceptable values.
- `max` - Rejectable.  If max is specified and input > max the promise will reject with the corresponding 'max' message.  The value can be: 'now', 'today', a value supported by moment.  The value can also be a function that returns one of the acceptable values.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will reject with the corresponding 'validate' message.  Function signature: `(date)=>Boolean`.
- `messages` - The messages that will be returned for each of the rejections.
- `formats` - The [moment string+formats](https://momentjs.com/docs/#/parsing/string-formats/) used for parsing strings.
- `...args` - Any additional args to pass to the [moment parser](https://momentjs.com/docs/#/parsing/).

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
If the input is successfully parsed it will return an object containing the moment, the Date, and properties containing common date/time fragments.
For more information on date/time fragments supported by moment, [click here](https://momentjs.com/docs/#/displaying/format/).
```js
{
  moment: moment,
  date: Date,
  // AM/PM
  A: moment.format('A'),
  // weekday
  ddd: moment.format('ddd'),
  dddd: moment.format('dddd'),
  // day
  D: moment.format('D'),
  DD: moment.format('DD'),
  // hour (12-hour clock)
  h: moment.format('h'),
  hh: moment.format('hh'),
  // hour (24-hour clock)
  H: moment.format('H'),
  HH: moment.format('HH'),
  // localized
  l: moment.format('l'),
  L: moment.format('L'),
  LT: moment.format('LT'),
  LTS: moment.format('LTS'),
  // minute
  m: moment.format('m'),
  mm: moment.format('mm'),
  // month
  M: moment.format('M'),
  MM: moment.format('MM'),
  // month name
  MMM: moment.format('MMM'),
  MMMM: moment.format('MMMM'),
  // fraction of second
  S: moment.format('S'),
  SS: moment.format('SS'),
  SSS: moment.format('SSS'),
  SSSS: moment.format('SSSS'),
  // year
  YY: moment.format('YY'),
  YYYY: moment.format('YYYY'),
  // time zone
  Z: moment.format('Z'),
}
```
