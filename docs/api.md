# data-tada

## API

### Parsers
The following parsers have been provided for you.  For an overview on how the default parsers work, [click here](api.parse.md).

#### [`Parse.date`](api.parse.date.md)
Parses dates using the [Moment.js library](https://momentjs.com/).

#### [`Parse.email`](api.parse.email.md)
Parses emails.

#### [`Parse.number`](api.parse.number.md)
Parses numbers.

#### [`Parse.phone`](api.parse.phone.md)
Parses phones.

#### [`Parse.ssn`](api.parse.ssn.md)
Parses SSNs.

#### [`Parse.string`](api.parse.string.md)
Parses strings.

#### [`Parse.zip`](api.parse.zip.md)
Parses ZIPs.

### Formatters

#### Date
- `Format.date.default` - 'MM/dd/yyyy'
- `Format.date.moment` - The moment object
- `Format.date.jsDate` - The JavaScript Date object
- `Format.date.ISO` - based on moment.toISOString()
- `Format.date.localeDateShort` - based on moment.format('l')
- `Format.date.localeDate` - based on moment.format('L')
- `Format.date.localeTimeShort` - based on moment.format('LT')
- `Format.date.localeTime` - based on moment.format('LTS')
- `Format.date['h:mm tt']`
- `Format.date['M/d']`
- `Format.date['M/d/yyyy']`
- `Format.date['MM/dd/yyyy']`
- `Format.date['M/d/yyyy h:mm tt']`
- `Format.date['MM/dd/yyyy h:mm tt']`
- `Format.date['MMMM d, yyyy']`

#### Email
- `Format.email.default` - john@doe.com
- `Format.email.mask` - ****@doe.com
- `Format.email.maskWith('#')` - ####@doe.com

#### Number
- `Format.number.default` - identity function
- `Format.number.abs` - Math.abs
- `Format.number.floor` - Math.floor
- `Format.number.ceil` - Math.ceil
- `Format.number.trunc` - Math.trunc
- `Format.number.round` - Math.round
- `Format.number.fixed2` - Number.toFixed(2)
- `Format.number.exponential2` - Number.toExponential(2)
- `Format.number.exponential(n)` - Number.toExponential(n)
- `Format.number.usd` - Number.toLocaleString('en-US', ...)
- `Format.number.locale` - Number.toLocaleString()
- `Format.number.binary` - Number.toString(2)
- `Format.number.octal` - Number.toString(8)
- `Format.number.hex` - Number.toString(16)
- `Format.number.base(n)` - Number.toString(n)

#### Phone
- `Format.phone.default` - area code and extension included with phone number
- `Format.phone.localOnly` - only local phone number

#### SSN
- `Format.ssn.default` - 123-45-6789
- `Format.ssn.last4` - 6789
- `Format.ssn.mask` - ***-**-6789
- `Format.ssn.maskWith('#')` - ###-##-6789

#### String
- `Format.string.default` - identity function
- `Format.string.lower` - String.toLowerCase
- `Format.string.upper` - String.toUpperCase
- `Format.string.trim` - String.trim
- `Format.string.title` - "simple" title case
- `Format.string.toBase64` - converts a string to base64
- `Format.string.fromBase64` - converts base64 to a string

#### Zip
- `Format.zip.default` - #####-####
- `Format.zip.zip` - #####
- `Format.zip.zipPlus4` - #####-####

### SyncPromise
SyncPromise is modeled after a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
This allows the convenience of the resolve/reject model with chainable `then` and `catch` functions, but with immediate
resolution.  [Read more](api.sync-promise.md)
