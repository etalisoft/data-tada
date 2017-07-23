import expect from 'expect';
import moment from 'moment';

import SyncPromise from '../../SyncPromise';
import parse from '../';

describe('parse.number', () => {
  let parser = parse.number();

  it('should return a SyncPromise', () => {
    let promise = parser();
    expect(promise).toBeA(SyncPromise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should support returning a Promise', () => {
    let promise = parse.number(Promise)();
    expect(promise).toBeA(Promise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should parse a valid value', () => {
    return parser('-123.45').then(result => {
      expect(result).toBe(-123.45);
    });
  });

  it('should parse a value after removing extraneous characters', () => {
    return parser('a-b1c23d.e45g').then(result => {
      expect(result).toBe(-123.45);
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
