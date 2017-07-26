# data-tada

## [API](api.md)

### Parser

#### `parser.date`

Parses dates using the [Moment.js library](https://momentjs.com/).

##### Configuration
```js
// Default configuration:
{
  model = SyncPromise,
  required = false,
  min = undefined,
  max = undefined,
  validate = undefined,
  formats = ['L', moment.ISO_8601],
  ...args,
}
```

- `model` - The promise model to use.  [SyncPromise](api.sync-promise.md) by default.  To use native asynchronous promises, specify: `parser.date({ model: Promise })`
- `required` - Rejectable.  If required=true and the input is falsy the promise will `reject('required')`.
- `min` - Rejectable.  If min is specified and input < min the promise will `reject('min')`.  The value can be: 'now', 'today', a value supported by [moment](https://momentjs.com/docs/#/parsing/).  The value can also be a function that returns one of the acceptable values.
- `max` - Rejectable.  If max is specified and input > max the promise will `reject('max')`.  The value can be: 'now', 'today', a value supported by moment.  The value can also be a function that returns one of the acceptable values.
- `validate` - Rejectable.  If the validate function is specified and results in false, the promise will `reject('validate')`.  Function signature: `(date)=>Boolean`.
- `formats` - The [moment string+formats](https://momentjs.com/docs/#/parsing/string-formats/) used for parsing strings.
- `...args` - Any additional args to pass to the [moment parser](https://momentjs.com/docs/#/parsing/).

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
