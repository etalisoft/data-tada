import expect from 'expect';

import createExecutionPlan from '../createExecutionPlan';
import SyncPromise from '../SyncPromise';

const noop = () => {};

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
    const value = 100;

    const plan1 = createExecutionPlan(SyncPromise)(value => resolve => resolve(value))
      .then(v => v * 2)
      .catch(v => v + 'err')
      .then(v => v + 1);
    const promise1 = plan1(100);
    expect(promise1.value()).toBe(201);

    const plan2 = createExecutionPlan(SyncPromise)(value => (_, reject) => reject(value))
      .then(v => v * 2)
      .catch(v => v + 'err')
      .then(v => v + 1);
    const promise2 = plan2(-100);
    expect(promise2.value()).toBe('-100err1');
  });
});
