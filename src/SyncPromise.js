const STATUS = {
  PENDING: 0,
  RESOLVED: 1,
  REJECTED: 2,
};

export default function SyncPromise(resolver) {
  if (!this || this === window || this === global) return new SyncPromise(resolver);
  if (!(resolver instanceof Function)) throw new TypeError(`SyncPromise resolver ${resolver} is not a function`);

  let status = 0;
  let value;

  const resolve = result => {
    if (!status) {
      status = STATUS.RESOLVED;
      value = result;
    }
  };

  const reject = err => {
    if (!status) {
      status = STATUS.REJECTED;
      value = err;
    }
  };

  const assertNotPending = method => {
    if (status === STATUS.PENDING) throw Error(`SyncPromise.${method} must be called after resolving/rejecting.`);
  };

  this.then = fn => {
    assertNotPending('then');
    if (status === STATUS.RESOLVED) {
      try {
        value = fn(value);
      } catch (e) {
        status = STATUS.REJECTED;
        value = e;
      }
    }
    return this;
  };

  this.catch = fn => {
    assertNotPending('catch');
    if (status === STATUS.REJECTED) {
      try {
        value = fn(value);
        status = STATUS.RESOLVED;
      } catch (e) {
        value = e;
      }
    }
    return this;
  };

  this.value = fn => {
    assertNotPending('value');
    if (fn instanceof Function) {
      const state = {
        value,
        status: ['pending', 'resolved', 'rejected'][status],
      };
      return fn(state);
    }
    return value;
  };

  const valueWhere = s => () => this.value(() => (status === s ? value : undefined));
  this.value.resolved = valueWhere(STATUS.RESOLVED);
  this.value.rejected = valueWhere(STATUS.REJECTED);

  try {
    resolver(resolve, reject);
  } catch (e) {
    if (!status) {
      status = STATUS.REJECTED;
      value = e;
    }
  }
}
