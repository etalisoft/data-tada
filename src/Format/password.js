export default {
  new: v => create(v),

  password: ({ password }) => password,
};

function create(value) {
  const password = typeof value === 'string' ? value : '';

  const types = n => {
    return n <= 31 ? ['nonPrint']
      : n <= 47 ? ['ascii', 'symbol']
      : n <= 57 ? ['ascii', 'digit']
      : n <= 64 ? ['ascii', 'symbol']
      : n <= 90 ? ['ascii', 'upper']
      : n <= 96 ? ['ascii', 'symbol']
      : n <= 122 ? ['ascii', 'lower']
      : n <= 126 ? ['ascii', 'symbol']
      : n <= 129 ? ['nonPrint']
      : n <= 140 ? ['asciiExtended']
      : n <= 144 ? ['nonPrint']
      : n <= 148 ? ['asciiExtended']
      : n <= 156 ? ['nonPrint']
      : n <= 158 ? ['asciiExtended']
      : n <= 172 ? ['nonPrint']
      : n <= 255 ? ['asciiExtended']
      : ['unicode'];
  };

  return password.split('').reduce((o, c) => {
    types(c.charCodeAt(0)).forEach(t => o[t]++);
    return o;
  }, {
    password,
    ascii: 0,
    asciiExtended: 0,
    nonPrint: 0,
    unicode: 0,
    lower: 0,
    upper: 0,
    digit: 0,
    symbol: 0,
  });
}
