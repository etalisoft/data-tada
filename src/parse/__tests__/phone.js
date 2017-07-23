import expect from 'expect';
import moment from 'moment';

import SyncPromise from '../../SyncPromise';
import parse from '../';

describe('parse.phone', () => {
  let parser = parse.phone();

  it('should return a SyncPromise', () => {
    let promise = parser();
    expect(promise).toBeA(SyncPromise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should support returning a Promise', () => {
    let promise = parse.phone(Promise)();
    expect(promise).toBeA(Promise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should parse a valid value', () => {
    return Promise.all([parser('18005551212'), parser('8005551212')]).then(results => {
      expect(results).toExist();
    });
  });

  it('should parse a value after removing extraneous characters', () => {
    return Promise.all([parser('1(800) 555-1212'), parser('Phone: 800.555.1212')]).then(results => {
      expect(results).toExist();
    });
  });

  it('should support a defaultAreaCode', () => {
    return Promise.all([parser('8005551212', '123'), parser('5551212', '123')]).then(results => {
      const phones = results.map(r => r.phone);
      expect(phones).toInclude('8005551212');
      expect(phones).toInclude('1235551212');
    });
  });

  it('should return a valid object', () => {
    return parser('8005551212').then(result => {
      expect(result.phone).toBe('8005551212');
      expect(result.areaCode).toBe('800');
      expect(result.local).toBe('5551212');
      expect(result.last4).toBe('1212');
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
