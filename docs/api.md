# data-tada

## API

### [Parsers](api.parse.md)
The following parsers have been provided for you.  For an overview on how the default parsers work, [click here](api.parse.md).

#### [`Parse.date`](api.parse.date.md)
Parses dates using the [Moment.js library](https://momentjs.com/).

#### [`Parse.email`](api.parse.email.md)
Parses emails.

#### [`Parse.number`](api.parse.number.md)
Parses numbers.

#### [`Parse.password`](api.parse.password.md)
Parses passwords.

#### [`Parse.phone`](api.parse.phone.md)
Parses phones.

#### [`Parse.ssn`](api.parse.ssn.md)
Parses SSNs.

#### [`Parse.string`](api.parse.string.md)
Parses strings.

#### [`Parse.username`](api.parse.username.md)
Parses usernames.

#### [`Parse.zip`](api.parse.zip.md)
Parses ZIPs.

### Formatters

#### Date
- `Format.date.new` - Create a moment from a value
- `Format.date.add(...args)` - moment.add(...)
- `Format.date.array` - moment.toArray()
- `Format.date.bound(low,high)` - moment limited by upper/lower bounds
- `Format.date.calendar(...args)` - moment.calendar(...args)
- `Format.date.date` - moment.toDate() // JavaScript Date object
- `Format.date.daysInMonth` - moment.daysInMonth()
- `Format.date.diff(d)` - moment.diff(d)
- `Format.date.endOf(s)` - moment.endOf(s)
- `Format.date.format(f)` - moment.format(f)
- `Format.date.from(d)` - moment.from(d)
- `Format.date.fromNow(b)` - moment.fromNow(b)
- `Format.date.invalid` - moment.invalid()
- `Format.date.ISO` - moment.toISOString()
- `Format.date.local` - moment.local()
- `Format.date.max(d)` - max(d, moment)
- `Format.date.min(d)` - min(d, moment)
- `Format.date.moment` - The moment (identity function)
- `Format.date.now` - New moment object set to now
- `Format.date.object` - moment.toObject()
- `Format.date.subtract(...args)` - moment.subtract(...args)
- `Format.date.startOf(s)` - moment.startOf(s)
- `Format.date.ticks` - moment.valueOf()
- `Format.date.to(d)` - moment.to(d)
- `Format.date.today` - New moment object set to today
- `Format.date.toNow(b)` - moment.toNow(b)
- `Format.date.utc` - moment.utc()
- `Format.date.utcOffset(...args)` - moment.utcOffset(...args)
- `Format.date.valid` - moment.isValid()

#### Email
- `Format.email.new` - Create an email from a value
- `Format.email.email` - john@doe.com
- `Format.email.mask` - \*\*\*\*@doe.com
- `Format.email.maskWith('#')` - ####@doe.com

#### Number
- `Format.number.new` - Create a number from a value
- `Format.number.abs` - Math.abs(n)
- `Format.number.base(x)` - Math.floor(n).toString(x)
- `Format.number.binary` - Math.floor(n).toString(2)
- `Format.number.bound(low,high)` - number limited by upper/lower bounds
- `Format.number.ceil` - Math.ceil(n)
- `Format.number.exponential(x)` - n.toExponential(x)
- `Format.number.fixed(x)` - n.toFixed(x)
- `Format.number.floor` - Math.floor(n)
- `Format.number.hex` - Math.floor(n).toString(16)
- `Format.number.locale(...args)` - n.toLocaleString(...args)
- `Format.number.max(x)` - Math.max(n,x)
- `Format.number.min(x)` - Math.min(n,x)
- `Format.number.nan` - NaN
- `Format.number.negativeInfinity` - Number.NEGATIVE_INFINITY
- `Format.number.number` - The number (identity function)
- `Format.number.octal` - Math.floor(n).toString(8)
- `Format.number.percent(x)` - #.##% (fixed to x places)
- `Format.number.positiveInfinity` - Number.POSITIVE_INFINITY
- `Format.number.round` - Math.round(n)
- `Format.number.trunc` - Math.trunc(n)
- `Format.number.usd` - $12,345.67
- `Format.number.zero` - 0

#### Password
- `Format.password.new` - Create a password object from a value
- `Format.password.password` - Extracts the password from the password object

#### Phone
- `Format.phone.new` - Create a phone from a value
- `Format.phone.phone` - area code and extension included with phone number
- `Format.phone.localOnly` - only local phone number

#### SSN
- `Format.ssn.new` - Create an SSN from a value
- `Format.ssn.ssn` - 123-45-6789
- `Format.ssn.last4` - 6789
- `Format.ssn.mask` - \*\*\*-\*\*-6789
- `Format.ssn.maskWith('#')` - ###-##-6789

#### String
- `Format.string.new` - Create a string from a value
- `Format.string.charAt(n)` - s.charAt(n)
- `Format.string.charCodeArray` - Create an array of character codes
- `Format.string.charCodeAt(n)` - s.charCodeAt(n)
- `Format.string.concat(...more)` - s.concat(...more)
- `Format.string.empty` - ''
- `Format.string.endsWith(v)` - s.endsWith(v)
- `Format.string.fromBase64` - window.atob(s)
- `Format.string.fromCharCode` - String.fromCharCode(v)
- `Format.string.includes(...args)` - s.includes(...args)
- `Format.string.indexOf(...args)` - s.indexOf(...args)
- `Format.string.lastIndexOf(...args)` - s.lastIndexOf(...args)
- `Format.string.left(n)` - Leftmost n characters of s
- `Format.string.length` - s.length
- `Format.string.localeCompare(...args)` - s.localeCompare(...args)
- `Format.string.localeLower(...args)` - s.toLocaleLowerCase(...args)
- `Format.string.localeUpper(...args)` - s.toLocaleUpperCase(...args)
- `Format.string.lower` - s.toLowerCase()
- `Format.string.maskMiddle` - abcdefgh->ab****gh
- `Format.string.maskMiddleWith('?')` abcdefgh->ab????gh
- `Format.string.match` - s.toUpperCase()
- `Format.string.normalize(form)` - s.normalize(form)
- `Format.string.padEnd(n, p)` - s.padEnd(n, p)
- `Format.string.padStart(n, p)` - s.padStart(n, p)
- `Format.string.repeat(n)` - s.repeat(n)
- `Format.string.replace(pattern,replacement)` - s.replace(pattern, replacement)
- `Format.string.right(n)` - Rightmost n characters of s
- `Format.string.search(regex)` - s.search(regex)
- `Format.string.slice(...args)` - s.slice(...args)
- `Format.string.split(...args)` - s.split(...args)
- `Format.string.startsWith(...args)` - s.startsWith(...args)
- `Format.string.string` - The string (identity function)
- `Format.string.substr(...args)` - s.substr(...args)
- [`Format.string.title(config)`](api.format.string.title.md) - "Simple" title case
- `Format.string.toBase64` - window.btoa(s)
- `Format.string.trim` - s.trim()
- `Format.string.upper` - s.toUpperCase()

#### username
- `Format.username.new` - Create a username string from a value

#### Zip
- `Format.zip.new` - Create a zip from a value
- `Format.zip.plus4` - 1234
- `Format.zip.zip` - 12345
- `Format.zip.zipPlus4` - 12345-1234

### SyncPromise
SyncPromise is modeled after a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
This allows the convenience of the resolve/reject model with chainable `then` and `catch` functions, but with immediate
resolution.  [Read more](api.sync-promise.md)
