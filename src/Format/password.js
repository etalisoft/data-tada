export default {
  new: v => create(v),
  mask: v => '*'.repeat(v.length),
  maskWith: (c = '*') => v => c.repeat(v.length),
};

function create(value) {
  return typeof value === 'string' ? value : value === null || value === undefined ? '' : `${value}`;
}
