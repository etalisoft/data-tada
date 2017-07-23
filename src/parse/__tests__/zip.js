import expect from 'expect';
import moment from 'moment';

import SyncPromise from '../../SyncPromise';
import parse from '../';

describe('parse.zip', () => {
  let parser = parse.zip();

  it('should return a SyncPromise', () => {
    let promise = parser();
    expect(promise).toBeA(SyncPromise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should support returning a Promise', () => {
    let promise = parse.zip(Promise)();
    expect(promise).toBeA(Promise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should parse a valid value', () => {
    return Promise.all([parser('12345'), parser('123456789')]).then(results => {
      expect(results).toExist();
    });
  });

  it('should parse a value after removing extraneous characters', () => {
    return parser('Zip: 12345-6789').then(result => {
      expect(result).toExist();
    });
  });

  it('should return a valid object', () => {
    return parser('123456789').then(result => {
      expect(result.zip).toBe('12345');
      expect(result.plus4).toBe('6789');
      expect(result.zipPlus4).toBe('12345-6789');
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
