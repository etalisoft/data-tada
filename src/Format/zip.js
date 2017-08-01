export default {
  new: value => create(value),

  plus4: ({ plus4 }) => plus4,
  zip: ({ zip }) => zip,
  zipPlus4: ({ zipPlus4 }) => zipPlus4,
};

function create(value) {
  const { zip, plus4, zipPlus4 } = value || {};
  return { zip, plus4, zipPlus4 };
}
