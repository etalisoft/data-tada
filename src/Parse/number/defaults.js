import SyncPromise from '../../SyncPromise';
import parse from './parse';

export default {
  model: SyncPromise,
  required: false,
  min: Number.NEGATIVE_INFINITY,
  max: Number.MAX_VALUE,
  validate: undefined,
  messages: {
    required: 'Required',
    invalid: 'Invalid',
    min: 'Too Low',
    max: 'Too High',
    validate: 'Invalid',
  },
  parse,
}
