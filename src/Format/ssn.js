export default {
  new: value => create(value),

  ssn: ({ ssn }) => ssn,
  last4: ({ last4 }) => last4,
  mask: ({ last4 }) => `***-**-${last4}`,
  maskWith: (c = '*') => ({ last4 }) => `${c.repeat(3)}-${c.repeat(2)}-${last4}`,
};

function create(value) {
  const { ssn, first3, middle2, last4 } = value || {};
  return { ssn, first3, middle2, last4 };
}
