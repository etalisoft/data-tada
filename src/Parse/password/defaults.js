import SyncPromise from '../../SyncPromise';
import parse from './parse';

export default {
  model: SyncPromise,
  trim: false,
  required: false,
  minLength: 8,
  maxLength: 50,
  minLower: 1,
  maxLower: Number.MAX_VALUE,
  minUpper: 1,
  maxUpper: Number.MAX_VALUE,
  minDigit: 1,
  maxDigit: Number.MAX_VALUE,
  minSymbol: 1,
  maxSymbol: Number.MAX_VALUE,
  minNonPrint: 0,
  maxNonPrint: 0,
  minAsciiExtended: 0,
  maxAsciiExtended: 0,
  minUnicode: 0,
  maxUnicode: 0,
  regex: undefined,
  notRegex: undefined,
  validate: undefined,
  messages: {
    required: 'Required',
    invalid: 'Invalid',
    minLength: 'Too Short',
    maxLength: 'Too Long',
    minLower: 'Too Few a-z',
    maxLower: 'Too Many a-z',
    minUpper: 'Too Few A-Z',
    maxUpper: 'Too Many A-Z',
    minDigit: 'Too Few 0-9',
    maxDigit: 'Too Many 0-9',
    minSymbol: 'Too Few Symbols',
    maxSymbol: 'Too Many Symbols',
    minNonPrint: 'Invalid',
    maxNonPrint: 'Invalid',
    minAsciiExtended: 'Invalid',
    maxAsciiExtended: 'Invalid',
    minUnicode: 'Invalid',
    maxUnicode: 'Invalid',
    regex: 'Invalid',
    notRegex: 'Invalid',
    validate: 'Invalid',
  },
  parse,
};
