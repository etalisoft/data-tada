export default value => {
  if (typeof value === 'string') {
    const reg = /^\D*(1?\D*(\d{3}))?\D*(\d{3})\D*(\d{4})([^\dxX]*[xX][^\dxX]*(\d+))?\D*$/;
    const match = value.match(reg);
    if (match) {
      const [, , areaCode, local3, last4, , extension] = match;
      return {
        phone: (areaCode ? `(${areaCode}) ` : '') + `${local3}-${last4}` + (extension ? ` ext. ${extension}` : ''),
        areaCode: areaCode || null,
        local3,
        last4,
        extension: extension || null,
      };
    }
  }
  return undefined;
};
