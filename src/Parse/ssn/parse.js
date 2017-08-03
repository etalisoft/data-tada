export default value => {
  if (typeof value === 'string') {
    const reg = /^\D*(\d{3})\D*(\d{2})\D*(\d{4})\D*$/;
    const match = value.match(reg);
    if (match) {
      const [, first3, middle2, last4] = match;
      return {
        ssn: `${first3}-${middle2}-${last4}`,
        first3,
        middle2,
        last4,
      };
    }
  }
  return undefined;
};
