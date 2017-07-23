import expect from 'expect';
import moment from 'moment';

import SyncPromise from '../../SyncPromise';
import parse from '../';

describe('parse.ssn', () => {
  let parser = parse.ssn();

  it('should return a SyncPromise', () => {
    let promise = parser();
    expect(promise).toBeA(SyncPromise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should support returning a Promise', () => {
    let promise = parse.ssn(Promise)();
    expect(promise).toBeA(Promise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should parse a valid value', () => {
    return parser('123456789').then(result => {
      expect(result).toExist();
    });
  });

  it('should parse a value after removing extraneous characters', () => {
    return parser('SSN: 123-45-6789').then(result => {
      expect(result).toExist();
    });
  });

  it('should return a valid object', () => {
    return parser('123456789').then(result => {
      expect(result.ssn).toBe('123-45-6789');
      expect(result.first3).toBe('123');
      expect(result.middle2).toBe('45');
      expect(result.last4).toBe('6789');
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
