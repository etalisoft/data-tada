import SyncPromise from './SyncPromise';

export default model => executor => {
  if (!(model instanceof Function)) throw TypeError(`ExecutionPlan model ${model} is not a function.`);
  if (!(executor instanceof Function)) throw TypeError(`ExecutionPlan executor ${executor} is not a function.`);

  const steps = [];

  function ExecutionPlan(...args) {
    const resolver = executor(...args);
    return steps.reduce((promise, { fn, args }) => fn(promise)(...args), new model(resolver));
  }

  const perform = fn => (...args) => purge => {
    steps.push({ fn, args });
    if (purge) {
      delete ExecutionPlan.value.resolved;
      delete ExecutionPlan.value.rejected;
      delete ExecutionPlan.value;
    }
    return ExecutionPlan;
  }
  ExecutionPlan.then = fn => perform(promise => promise.then)(fn)(false);
  ExecutionPlan.catch = fn => perform(promise => promise.catch)(fn)(false);
  if (model === SyncPromise) {
    ExecutionPlan.value = fn => perform(promise => promise.value)(fn)(true);
    ExecutionPlan.value.resolved = () => perform(promise => promise.value.resolved)()(true);
    ExecutionPlan.value.rejected = () => perform(promise => promise.value.rejected)()(true);
  }

  return ExecutionPlan;
};
