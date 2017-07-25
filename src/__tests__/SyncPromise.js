import expect, { spyOn } from 'expect';

import SyncPromise from '../SyncPromise';

describe('SyncPromise', () => {
  it('should be a function', () => {
    expect(SyncPromise).toBeA(Function);
  });

  it('should require a resolver', () => {
    expect(() => new SyncPromise()).toThrow(/SyncPromise resolver/);
  });

  it('should return a SyncPromise', () => {
    expect(SyncPromise(() => {})).toBeA(SyncPromise, 'SyncPromise(fn)');
    expect(new SyncPromise(() => {})).toBeA(SyncPromise, 'new SyncPromise(fn)');
  });

  it('should throw an error if `then` is called before resolve/reject', () => {
    expect(() => SyncPromise(() => {}).then(o => o)).toThrow(/SyncPromise.then/);
  });

  it('should throw an error if `catch` is called before resolve/reject', () => {
    expect(() => SyncPromise(() => {}).catch(o => o)).toThrow(/SyncPromise.catch/);
  });

  it('should throw an error if `value` is called before resolve/reject', () => {
    const callUnresolvedSyncPromiseValue = () => new SyncPromise(() => {}).value();
    expect(callUnresolvedSyncPromiseValue).toThrow(/SyncPromise.value/);
  });

  it('should chain `then` functions after resolve', () => {
    const handlers = {
      then: v => v + 1,
      catch: v => NaN,
    };
    spyOn(handlers, 'then').andCallThrough();
    spyOn(handlers, 'catch').andCallThrough();
    const promise = new SyncPromise(resolve => resolve(0))
      .then(handlers.then)
      .catch(handlers.catch)
      .then(handlers.then)
      .then(handlers.then);
    expect(handlers.then).toHaveBeenCalled();
    expect(handlers.then.calls.length).toBe(3);
    expect(handlers.catch).toNotHaveBeenCalled();
    promise.value(({ status, value }) => {
      expect(status).toBe('resolved');
      expect(value).toBe(3);
    });
  });

  it('should call `catch` and then chain `then` functions after reject', () => {
    const handlers = {
      skip: v => NaN,
      then: v => v + 1,
      catch: v => 0,
    };
    spyOn(handlers, 'skip').andCallThrough();
    spyOn(handlers, 'then').andCallThrough();
    spyOn(handlers, 'catch').andCallThrough();
    const promise = new SyncPromise((_, reject) => reject('err'))
      .then(handlers.skip)
      .catch(handlers.catch)
      .then(handlers.then)
      .catch(handlers.skip)
      .then(handlers.then);
    expect(handlers.skip).toNotHaveBeenCalled();
    expect(handlers.catch).toHaveBeenCalled();
    expect(handlers.then).toHaveBeenCalled();
    expect(handlers.then.calls.length).toBe(2);
    promise.value(({ status, value }) => {
      expect(status).toBe('resolved');
      expect(value).toBe(2);
    });
  });

  it('should only resolve/reject in the resolver once', () => {
    new SyncPromise((resolve, reject) => {
      resolve('a');
      resolve('b');
      reject('c');
      throw Error('d');
    }).value(({ status, value }) => {
      expect(status).toBe('resolved');
      expect(value).toBe('a');
    });

    new SyncPromise((resolve, reject) => {
      reject('e');
      reject('f');
      resolve('g');
      throw Error('h');
    }).value(({ status, value }) => {
      expect(status).toBe('rejected');
      expect(value).toBe('e');
    });

    new SyncPromise((resolve, reject) => {
      throw 'i'; // eslint-disable-line no-throw-literal
      resolve('j'); // eslint-disable-line no-unreachable
      reject('k');
    }).value(({ status, value }) => {
      expect(status).toBe('rejected');
      expect(value).toBe('i');
    })
  });

  it('should call `catch` if a `then` throws an error', () => {
    const handlers = {
      skip: () => NaN,
      throw: () => {
        throw 'err'; // eslint-disable-line no-throw-literal
      },
      then: v => v + 1,
      catch: v => 0,
    };
    spyOn(handlers, 'skip').andCallThrough();
    spyOn(handlers, 'throw').andCallThrough();
    spyOn(handlers, 'then').andCallThrough();
    spyOn(handlers, 'catch').andCallThrough();
    const promise = new SyncPromise(resolve => resolve(0))
      .then(handlers.throw)
      .then(handlers.skip)
      .catch(handlers.catch)
      .then(handlers.then)
      .catch(handlers.catch)
      .then(handlers.then);
    expect(handlers.throw).toHaveBeenCalled();
    expect(handlers.skip).toNotHaveBeenCalled();
    expect(handlers.catch).toHaveBeenCalled();
    expect(handlers.catch.calls.length).toBe(1);
    expect(handlers.then).toHaveBeenCalled();
    expect(handlers.then.calls.length).toBe(2);
    promise.value(({ status, value }) => {
      expect(status).toBe('resolved');
      expect(value).toBe(2);
    });
  });

  it('should call `catch` if a `catch` throws an error', () => {
    const handlers = {
      skip: () => NaN,
      throw: () => {
        throw 'err'; // eslint-disable-line no-throw-literal
      },
      then: v => v + 1,
      catch: v => 0,
    };
    spyOn(handlers, 'skip').andCallThrough();
    spyOn(handlers, 'throw').andCallThrough();
    spyOn(handlers, 'then').andCallThrough();
    spyOn(handlers, 'catch').andCallThrough();
    const promise = new SyncPromise((_, reject) => reject(0))
      .then(handlers.skip)
      .catch(handlers.throw)
      .then(handlers.skip)
      .catch(handlers.catch)
      .then(handlers.then)
      .catch(handlers.skip)
      .then(handlers.then);
    expect(handlers.skip).toNotHaveBeenCalled();
    expect(handlers.throw).toHaveBeenCalled();
    expect(handlers.catch).toHaveBeenCalled();
    expect(handlers.catch.calls.length).toBe(1);
    expect(handlers.then).toHaveBeenCalled();
    expect(handlers.then.calls.length).toBe(2);
    promise.value(({ status, value }) => {
      expect(status).toBe('resolved');
      expect(value).toBe(2);
    })
  });
});
