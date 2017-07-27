export default {
  default: ({ email }) => email,
  mask: ({ user, domain }) => `${'*'.repeat(user.length)}@${domain}`,
  maskWith: (c = '*') => ({ user, domain }) => `${c.repeat(user.length)}@${domain}`,
};
