export default {
  new: v => create(v),

  abs: Math.abs,
  base: n => v => Math.floor(v).toString(n),
  binary: v => Math.floor(v).toString(2),
  bound: (low, high) => v => Math.max(low, Math.min(high, v)),
  ceil: Math.ceil,
  exponential: n => v => v.toExponential(n),
  fixed: n => v => v.toFixed(n),
  floor: Math.floor,
  hex: v => Math.floor(v).toString(16),
  locale: (...args) => v => v.toLocaleString(...args),
  max: n => v => Math.max(n, v),
  min: n => v => Math.min(n, v),
  nan: () => NaN,
  negativeInfinity: () => Number.NEGATIVE_INFINITY,
  number: Number.parseFloat,
  octal: v => Math.floor(v).toString(8),
  percent: n => v => `${(v * 100).toFixed(n)}%`,
  positiveInfinity: () => Number.POSITIVE_INFINITY,
  round: Math.round,
  trunc: Math.trunc,
  usd: v => v.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  zero: () => 0,
};

function create(value) {
  return isNaN(value) ? NaN : parseFloat(value);
}
