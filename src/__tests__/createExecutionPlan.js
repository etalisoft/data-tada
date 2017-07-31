import expect from 'expect';

import createExecutionPlan from '../createExecutionPlan';
import SyncPromise from '../SyncPromise';

const noop = () => {};
const resolve = value => resolve => resolve(value);
const reject = value => (_, reject) => reject(value);

describe('executionPlan', () => {
  it('should return an executionPlan function', () => {
    const plan = createExecutionPlan(SyncPromise)(noop);
    expect(plan).toBeA(Function);
    expect(plan.name).toBe('ExecutionPlan');
    expect(plan.then).toBeA(Function);
    expect(plan.catch).toBeA(Function);
  });

  it('should throw TypeError for model and executor', () => {
    expect(() => createExecutionPlan()(noop)).toThrow(/ExecutionPlan model/);
    expect(() => createExecutionPlan(noop)()).toThrow(/ExecutionPlan executor/);
  });

  it('should allow then/catch chaining before promise creation', () => {
    const plan1 = createExecutionPlan(SyncPromise)(resolve)
      .then(v => v * 2)
      .catch(v => v + 'err')
      .then(v => v + 1);
    const promise1 = plan1(100);
    expect(promise1.value()).toBe(201);

    const plan2 = createExecutionPlan(SyncPromise)(reject)
      .then(v => v * 2)
      .catch(v => v + 'err')
      .then(v => v + 1);
    const promise2 = plan2(-100);
    expect(promise2.value()).toBe('-100err1');
  });

  it('should support the value function if the model is SyncPromise', () => {
    const plan1 = createExecutionPlan(SyncPromise)(resolve);
    expect(plan1.value).toBeA(Function);
    expect(plan1.value.resolved).toBeA(Function);
    expect(plan1.value.rejected).toBeA(Function);

    const plan2 = createExecutionPlan(Promise)(resolve);
    expect(plan2.value).toNotExist();
  });

  it('should allow value() to be specified before promise creation', () => {
    const plan1 = createExecutionPlan(SyncPromise)(resolve)
      .then(v => v * 2)
      .value();
    expect(plan1(100)).toBe(200);

    const plan2 = createExecutionPlan(SyncPromise)(reject)
      .value();
    expect(plan2('err')).toBe('err');
  });

  it('should allow value(fn) to be specified before promise creation', () => {
    const plan1 = createExecutionPlan(SyncPromise)(resolve)
      .value(({ status, value }) => {
        expect(status).toBe('resolved');
        expect(value).toBe(100);
        return 'value1';
      });
    const value1 = plan1(100);
    expect(value1).toBe('value1');

    const plan2 = createExecutionPlan(SyncPromise)(reject)
      .value(({ status, value }) => {
        expect(status).toBe('rejected');
        expect(value).toBe('err');
        return 'value2';
      });
    const value2 = plan2('err');
    expect(value2).toBe('value2');
  });

  it('should allow value.resolved() to be specified before promise creation', () => {
    const plan1 = createExecutionPlan(SyncPromise)(resolve).value.resolved();
    expect(plan1(100)).toBe(100);

    const plan2 = createExecutionPlan(SyncPromise)(reject).value.resolved();
    expect(plan2('err')).toNotExist();
  });


  it('should allow value.rejected() to be specified before promise creation', () => {
    const plan1 = createExecutionPlan(SyncPromise)(resolve).value.rejected();
    expect(plan1(100)).toNotExist();

    const plan2 = createExecutionPlan(SyncPromise)(reject).value.rejected();
    expect(plan2('err')).toBe('err');
  });

  it('should not allow value to be chained before promise creation', () => {
    const plan = createExecutionPlan(SyncPromise)(resolve).value();
    expect(plan(100)).toBe(100);
    expect(plan.value).toNotExist();
  });
});
