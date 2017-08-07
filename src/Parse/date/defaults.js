import moment from 'moment';

import SyncPromise from '../../SyncPromise';
import parse from './parse';

export default {
  model: SyncPromise,
  required: false,
  min: undefined,
  max: undefined,
  validate: undefined,
  messages: {
    required: 'Required',
    invalid: 'Invalid',
    min: 'Too Early',
    max: 'Too Late',
    validate: 'Invalid',
  },
  parse,
  formats: ['MMM D, YYYY', 'L', moment.ISO_8601],
  args: undefined,
};
