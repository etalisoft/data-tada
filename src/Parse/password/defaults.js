import SyncPromise from '../../SyncPromise';
import parse from './parse';

// Require lowercase, uppercase, digit, and special character
// Only allow printable ASCII characters
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\x20-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[\x20-\x7E]*$/;

export default {
  model: SyncPromise,
  trim: false,
  required: false,
  minLength: 8,
  maxLength: 50,
  regex,
  notRegex: undefined,
  validate: undefined,
  messages: {
    required: 'Required',
    invalid: 'Invalid',
    minLength: 'Too Short',
    maxLength: 'Too Long',
    regex: 'Invalid',
    notRegex: 'Invalid',
    validate: 'Invalid',
  },
  parse,
};
