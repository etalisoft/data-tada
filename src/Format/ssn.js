export default {
  default: ({ ssn }) => ssn,
  last4: ({ last4 }) => last4,
  mask: ({ last4 }) => `***-**-${last4}`,
  maskWith: (c = '*') => ({ last4 }) => `${c.repeat(3)}-${c.repeat(2)}-${last4}`,
};
