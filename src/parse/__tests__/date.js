import expect from 'expect';
import moment from 'moment';

import SyncPromise from '../../SyncPromise';
import parse from '../';

describe('parse.date', () => {
  let parser = parse.date();

  it('should return a SyncPromise', () => {
    let promise = parser();
    expect(promise).toBeA(SyncPromise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should support returning a Promise', () => {
    let promise = parse.date(Promise)();
    expect(promise).toBeA(Promise);
    expect(promise.then).toBeA(Function);
    expect(promise.catch).toBeA(Function);
    const noop = () => {};
    promise.then(noop).catch(noop);
  });

  it('should parse a valid value', () => {
    return parser('1970-01-01').then(result => {
      expect(result).toExist();
    });
  });

  it('should return a valid object', () => {
    return parser('2003-05-06T01:02:03.0123Z').then(result => {
      expect(result.moment).toBeA(moment);
      expect(result.date).toBeA(Date);
      expect(result.d).toBe('5');
      expect(result.dd).toBe('05');
      expect(result.ddd).toBe('Mon');
      expect(result.dddd).toBe('Monday');
      expect(result.f).toBe('0');
      expect(result.ff).toBe('01');
      expect(result.fff).toBe('012');
      expect(result.ffff).toBe('0120');
      expect(result.h).toBe('7');
      expect(result.hh).toBe('07');
      expect(result.H).toBe('19');
      expect(result.HH).toBe('19');
      expect(result.m).toBe('2');
      expect(result.mm).toBe('02');
      expect(result.M).toBe('5');
      expect(result.MM).toBe('05');
      expect(result.MMM).toBe('May');
      expect(result.MMMM).toBe('May');
      expect(result.tt).toBe('PM');
      expect(result.yy).toBe('03');
      expect(result.yyyy).toBe('2003');
      expect(result.z).toBe('-06:00');
    });
  });

  it('should reject for an invalid value', () => {
    return parser('o.O')
      .then(() => {
        throw 'err';
      })
      .catch(err => {
        expect(err).toNotExist();
      });
  });
});
