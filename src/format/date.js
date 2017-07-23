import parse from '../parse';

export default {
  default: ({ MM, dd, yyyy }) => `${MM}/${dd}/${yyyy}`,
  'h:mm tt': ({ h, mm, tt }) => `${h}:${mm} ${tt}`,
  'M/d': ({ M, d }) => `${M}/${d}`,
  'M/d/yyyy': ({ M, d, yyyy }) => `${M}/${d}/${yyyy}`,
  'MM/dd/yyyy': ({ MM, dd, yyyy }) => `${MM}/${dd}/${yyyy}`,
  'M/d/yyyy h:mm tt': ({ M, d, yyyy, h, mm, tt }) => `${M}/${d}/${yyyy} ${h}:${mm} ${tt}`,
  'MM/dd/yyyy h:mm tt': ({ MM, dd, yyyy, h, mm, tt }) => `${MM}/${dd}/${yyyy} ${h}:${mm} ${tt}`,
  'MMMM d, yyyy': ({ MMMM, d, yyyy }) => `${MMMM} ${d}, ${yyyy}`,
  ISO: ({ moment }) => moment.toISOString(),
};
