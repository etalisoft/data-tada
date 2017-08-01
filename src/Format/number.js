export default {
  new: v => create(v),

  positiveInfinity: () => Number.POSITIVE_INFINITY,
  negativeInfinity: () => Number.NEGATIVE_INFINITY,
  zero: () => 0,
  nan: () => NaN,

  number: Number.parseFloat,
  abs: Math.abs,
  floor: Math.floor,
  ceil: Math.ceil,
  trunc: Math.trunc,
  round: Math.round,

  bound: (low, high) => v => Math.max(low, Math.min(high, v)),
  min: n => v => Math.min(n, v),
  max: n => v => Math.max(n, v),
  fixed: n => v => v.toFixed(n),
  percent: n => v => `${(v * 100).toFixed(n)}%`,
  exponential: n => v => v.toExponential(n),
  usd: v => v.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  locale: (...args) => v => v.toLocaleString(...args),
  binary: v => Math.floor(v).toString(2),
  octal: v => Math.floor(v).toString(8),
  hex: v => Math.floor(v).toString(16),
  base: n => v => Math.floor(v).toString(n),
};

function create(value) {
  return isNaN(value) ? NaN : parseFloat(value);
}
