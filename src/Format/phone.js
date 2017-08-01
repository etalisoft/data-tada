export default {
  new: value => create(value),

  phone: ({ phone }) => phone,
  localOnly: ({ local3, last4 }) => `${local3}-${last4}`,
};

function create(value) {
  const { phone, areaCode, local3, last4, extension } = value || {};
  return { phone, areaCode, local3, last4, extension };
}
