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

  it('should return default status/value before resolve/reject', () => {
    const promise = new SyncPromise(() => {});
    expect(promise.status).toBe('pending');
    expect(promise.value).toBe(undefined);
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
    expect(promise.status).toBe('resolved');
    expect(promise.value).toBe(3);
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
    expect(promise.status).toBe('resolved');
    expect(promise.value).toBe(2);
  });

  it('should only resolve/reject in the resolver once', () => {
    const p1 = new SyncPromise((resolve, reject) => {
      resolve('a');
      resolve('b');
      reject('c');
      throw Error('d');
    });
    expect(p1.status).toBe('resolved');
    expect(p1.value).toBe('a');

    const p2 = new SyncPromise((resolve, reject) => {
      reject('e');
      reject('f');
      resolve('g');
      throw Error('h');
    });
    expect(p2.status).toBe('rejected');
    expect(p2.value).toBe('e');

    const p3 = new SyncPromise((resolve, reject) => {
      throw 'i';
      resolve('j');
      reject('k');
    });
    expect(p3.status).toBe('rejected');
    expect(p3.value).toBe('i');
  });

  it('should call `catch` if a `then` throws an error', () => {
    const handlers = {
      skip: () => NaN,
      throw: () => {
        throw 'err';
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
    expect(promise.status).toBe('resolved');
    expect(promise.value).toBe(2);
  });

  it('should call `catch` if a `catch` throws an error', () => {
    const handlers = {
      skip: () => NaN,
      throw: () => {
        throw 'err';
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
    expect(promise.status).toBe('resolved');
    expect(promise.value).toBe(2);
  });
});
