export default {
  word: /[a-z]([^\s-&]*)/gi,
  capitalizeFirstWord: true,
  capitalizeLastWord: true,
  shortWords: /^(a|an|and|at|but|by|for|in|nor|of|on|or|so|the|to|up|yet)$/,
  replacements: {
    ii: 'II',
    iii: 'III',
    iv: 'IV',
    llc: 'LLC',
    usa: 'USA',
    ytd: 'YTD',
    itunes: 'iTunes',
    iphone: 'iPhone',
  },
  particles: {
    test: /^(mc|o')/,
    replacements: {
      mc: 'Mc',
      "o'": "O'",
    },
  },
};
