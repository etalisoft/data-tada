import SyncPromise from '../../SyncPromise';
import parse from './parse';

export default {
  model: SyncPromise,
  required: false,
  validate: undefined,
  messages: {
    required: 'Required',
    invalid: 'Invalid',
    validate: 'Invalid',
  },
  parse
};
