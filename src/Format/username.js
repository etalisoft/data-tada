export default {
  new: v => create(v),

  mask: maskMiddle(),
  maskWith: maskMiddle,
};

function maskMiddle(char = '*') {
  return str => {
    var reg = /^(\w)(\w{2,3})(\w$)|(\w\w)(\w+?)(\w\w$)/;
    var match = str.match(reg);
    if (match) {
      var o = match[1] ? 1 : 4;
      return match[o] + new Array(match[o + 1].length + 1).join(char) + match[o + 2];
    }
    return str;
  };
}

function create(value) {
  return typeof value === 'string' ? value : value === null || value === undefined ? '' : `${value}`;
}
