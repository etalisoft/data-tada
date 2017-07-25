# data-tada

## API

### Parsers

#### `parser.date`
Parses dates using the [Moment.js library](https://momentjs.com/).  For usage and examples, [click here](api.parser.date.md).

#### `parser.email`
Parses emails.  For usage and examples, [click here](api.parser.email.md).

#### `parser.number`
Parses numbers.  For usage and examples, [click here](api.parser.number.md).

#### `parser.phone`
Parses phones.  For usage and examples, [click here](api.parser.phone.md).

#### `parser.ssn`
Parses SSNs.  For usage and examples, [click here](api.parser.ssn.md).

#### `parser.string`
Parses strings.  For usage and examples, [click here](api.parser.string.md).

#### `parser.zip`
Parses ZIPs.  For usage and examples, [click here](api.parser.zip.md).

### Formatters

#### Date
- `format.date.default` - 'MM/dd/yyyy'
- `format.date.ISO` - based on moment.toISOString()
- `localeDateShort` - based on moment.format('l')
- `localeDate` - based on moment.format('L')
- `localeTimeShort` - based on moment.format('LT')
- `localeTime` - based on moment.format('LTS')
- `h:mm tt`
- `M/d`
- `M/d/yyyy`
- `MM/dd/yyyy`
- `M/d/yyyy h:mm tt`
- `MM/dd/yyyy h:mm tt`
- `MMMM d, yyyy`

#### Email
- `format.email.default` - john@doe.com
- `format.email.mask` - ****@doe.com
- `format.email.maskWith('#')` - ####@doe.com

#### Number
- `format.number.default` - identity function
- `format.number.abs` - Math.abs
- `format.number.floor` - Math.floor
- `format.number.ceil` - Math.ceil
- `format.number.trunc` - Math.trunc
- `format.number.round` - Math.round
- `format.number.fixed2` - Number.toFixed(2)
- `format.number.exponential2` - Number.toExponential(2)
- `format.number.exponential(n)` - Number.toExponential(n)
- `format.number.usd` - Number.toLocaleString('en-US', ...)
- `format.number.locale` - Number.toLocaleString()
- `format.number.binary` - Number.toString(2)
- `format.number.octal` - Number.toString(8)
- `format.number.hex` - Number.toString(16)
- `format.number.base(n)` - Number.toString(n)

#### Phone
- `format.phone.default` - area code and extension included with phone number
- `format.phone.localOnly` - only local phone number

#### SSN
- `format.ssn.default` - 123-45-6789
- `format.ssn.last4` - 6789
- `format.ssn.mask` - ***-**-6789
- `format.ssn.maskWith('#')` - ###-##-6789

#### String
- `format.string.default` - identity function
- `format.string.lower` - String.toLowerCase
- `format.string.upper` - String.toUpperCase
- `format.string.trim` - String.trim
- `format.string.title` - "simple" title case
- `format.string.toBase64` - converts a string to base64
- `format.string.fromBase64` - converts base64 to a string

#### Zip
- `format.zip.default` - #####-####
- `format.zip.zip` - #####
- `format.zip.zipPlus4` - #####-####

### SyncPromise
SyncPromise is modeled after a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
This allows the convenience of the resolve/reject model with chainable `then` and `catch` functions, but with immediate
resolution.  [Read more](api.sync-promise.md)
