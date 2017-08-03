export default value => {
  if (typeof value === 'string') {
    const reg = /^\D*(\d{5})\D*(\d{4})?\D*$/;
    const match = value.match(reg);
    if (match) {
      const [, zip, plus4] = match;
      return {
        zip,
        plus4,
        zipPlus4: zip + (plus4 ? `-${plus4}` : ''),
      };
    }
  }
  return undefined;
};
