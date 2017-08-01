export default {
  new: email => create(email),

  email: ({ email }) => email || '',
  mask: ({ user, domain }) => `${'*'.repeat(user.length)}@${domain}`,
  maskWith: (c = '*') => ({ user, domain }) => `${c.repeat(user.length)}@${domain}`,
};

function create(value) {
  const email = typeof value === 'string' ? value : '';
  const [user, domain] = email.split('@');
  return { email, user, domain };
}
