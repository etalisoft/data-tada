export default {
  default: ({ phone }) => phone,
  localOnly: ({ local3, last4 }) => `${local3}-${last4}`,
};
