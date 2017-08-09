import SyncPromise from '../../SyncPromise';
import parse from './parse';

export default {
  model: SyncPromise,
  trim: true,
  required: false,
  minLength: 4,
  maxLength: 25,
  regex: /^[a-z][\w.-]*$/i,
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
