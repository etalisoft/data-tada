export default {
  new: value => create(value),

  fromCharCode: arr => String.fromCharCode(...arr),
  join: (c = '') => arr => arr.join(c),
  toHex: arr => arr.map(n => `${n < 16 ? '0' : ''}${n.toString(16)}`).join(''),
};

function create(value) {
  return value instanceof Array ? value : [];
}
