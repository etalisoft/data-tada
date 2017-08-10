export default {
  new: v => create(v),
};

function create(value) {
  return typeof value === 'string' ? value : value === null || value === undefined ? '' : `${value}`;
}
