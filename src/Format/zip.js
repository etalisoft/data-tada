export default {
  new: value => create(value),

  zip: ({ zip }) => zip,
  plus4: ({ plus4 }) => plus4,
  zipPlus4: ({ zipPlus4 }) => zipPlus4,
};

function create(value) {
  const { zip, plus4, zipPlus4 } = value || {};
  return { zip, plus4, zipPlus4 };
}
