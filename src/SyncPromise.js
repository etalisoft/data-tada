export default function SyncPromise(resolver) {
  if (!this) return new SyncPromise(resolver);
  if (!(resolver instanceof Function)) throw new TypeError(`SyncPromise resolver ${resolver} is not a function`);

  const STATUS = {
    PENDING: 0,
    RESOLVED: 1,
    REJECTED: 2,
  };

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

  try {
    resolver(resolve, reject);
  } catch (e) {
    if (!status) {
      status = STATUS.REJECTED;
      value = e;
    }
  }

  this.then = fn => {
    if (status === STATUS.PENDING) throw Error('SyncPromise.then must be called after resolving/rejecting.');
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
    if (status === STATUS.PENDING) throw Error('SyncPromise.catch must be called after resolving/rejecting.');
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
    if (status === STATUS.PENDING) throw Error('SyncPromise.value must be called after resolving/rejecting.');
    const state = {
      value,
      status: ['pending', 'resolved', 'rejected'][status],
    };
    return fn instanceof Function ? fn(state) : value;
  }
}
