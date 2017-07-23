import expect from 'expect';
import moment from 'moment';

import SyncPromise from '../../SyncPromise';
import parse from '../';

describe('parse.email', () => {
  let parser = parse.email();

  it('should return a SyncPromise', () => {
    const promise = parser('john@doe.com');
    expect(promise).toBeA(SyncPromise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should support returning a Promise', () => {
    const promise = parse.email(Promise)('john@doe.com');
    expect(promise).toBeA(Promise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should parse a valid value', () => {
    return parser('john@doe.com').then(result => {
      expect(result).toExist();
    });
  });

  it('should return a valid object', () => {
    return parser('john@doe.com').then(result => {
      expect(result.email).toBe('john@doe.com');
      expect(result.user).toBe('john');
      expect(result.domain).toBe('doe.com');
    });
  });

  it('should reject for an invalid value', () => {
    return parser('o.O')
      .then(result => {
        throw 'err';
      })
      .catch(err => {
        expect(err).toNotExist();
      });
  });
});
