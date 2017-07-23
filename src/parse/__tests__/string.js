import expect from 'expect';
import moment from 'moment';

import SyncPromise from '../../SyncPromise';
import parse from '../';

describe('parse.string', () => {
  let parser = parse.string();

  it('should return a SyncPromise', () => {
    let promise = parser();
    expect(promise).toBeA(SyncPromise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should support returning Promise', () => {
    let promise = parse.string(Promise)();
    expect(promise).toBeA(Promise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should parse valid values', () => {
    const promises = Promise.all(['asdf', null, undefined, { toString: () => '1234' }].map(o => parser(o)));
    return promises.then(results => {
      expect(JSON.stringify(results)).toBe(JSON.stringify(['asdf', '', '', '1234']));
    });
  });

  it('should reject for an invalid value', () => {
    return parser(() => '')
      .then(result => {
        throw 'err';
      })
      .catch(err => {
        expect(err).toNotExist();
      });
  });
});
