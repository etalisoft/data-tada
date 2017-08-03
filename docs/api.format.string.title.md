# data-tada

## [API](api.md)

### Formatters

#### Format.string

##### Format.string.title
Title casing is complicated.  This is a "simple" implementation that may require some additional post-processing.  See the [Issues](#issues) section for more details.

```js
// Default configuration:
// Accessible via: Format.string.title.defaults
Format.string.title({
  word: /[a-z]([^\s-&]*)/gi,
  capitalizeFirstWord: true,
  capitalizeLastWord: true,
  shortWords: /^(a|an|and|at|but|by|for|in|nor|of|on|or|so|the|to|up|yet)$/,
  replacements: {
    ii: 'II',
    iii: 'III',
    iv: 'IV',
    llc: 'LLC',
    usa: 'USA',
    ytd: 'YTD',
    itunes: 'iTunes',
    iphone: 'iPhone',
  },
  particles: {
    test: /^(mc|o')/,
    replacements: {
      mc: 'Mc',
      "o'": "O'",
    },
  },
});
```


- `word` - The [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) to locate the individual words.
- `capitalizeFirstWord` - Whether to always capitalize the first word.
- `capitalizeLastWord` - Whether to always capitalize the last word.
- `shortWords` - The [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) to match words that should not be capitalized.
- `replacements` - Any words that should override their normal capitalization.
- `particles` - [Capitalization special case particles](https://en.wikipedia.org/wiki/Capitalization#Special_cases).  Set it to an empty object to prevent these rules from executing.  If a particle is matched, it is replaced with its corresponding replacement and the remainder of the word has its first character capitalized.
- `particles.test` - The [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) to match particles.  NOTE: The particle 'Mac' was intentionally avoided to prevent cases like Macey from being incorrectly capitalized to MacEy.
- `particles.replacements` - The casing that should override the particle.

###### Examples
```js
const toTitleCase = Format.string.title();
toTitleCase('the night of');
//          'The Night Of'
toTitleCase('beFoRE THE NiGht OF ENDS');
//          'Before the Night of Ends'
toTitleCase("A BOOK BY MCDONALD-O'REILLY");
//          "A Book by McDonald-O'Reilly"
toTitleCase('the iphone iv was not made in the usa');
//          'The iPhone IV Was Not Made in the USA'
```

###### Issues
The default configuration will incorrectly format 'AT&amp;T' as 'At&amp;T'.  You cannot add a replacement to it because the &amp; sign is a word-boundary character.

URIs and email addresses would also be poorly formatted.

The formatter also does not take into account punctuation.  Multiple sentences should individually have their first and last words capitalized, but this is ignored.

To specifically address issues like this you would need to do replacements after title casing.  Below is a simple example to fix the AT&amp;T issue and URLs (with protocols).
```js
import { Format, Parse } from 'data-tada';
const toTitleCase = Parse.string({ required: true })
  .then(Format.string.title()) // Change to title case
  .then(Format.string.replace(/At&T/g, 'AT&T')) // Fix AT&T
  .then(Format.string.replace(/\w+:\/\/\S+/g, m => m.toLowerCase())) // Fix URLs
  .catch(Format.string.empty) // Convert parsing errors to empty string
  .value();
toTitleCase('carriers: at&t and t-mobile');
//          'Carriers: AT&T and T-Mobile'
toTitleCase('CHECK OUT HTTPS://SITE.COM/STUFF-AND-THINGS?A=1&T=2 TODAY!');
//          'Check Out https://site.com/stuff-and-things?a=1&t=2 Today!'
```
