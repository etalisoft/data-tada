import SyncPromise from '../../SyncPromise';
import parse from './parse';

export default {
  model: SyncPromise,
  trim: true,
  required: false,
  minLength: 0,
  maxLength: Number.MAX_VALUE,
  regex: undefined,
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
