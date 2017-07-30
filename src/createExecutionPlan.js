export default model => executor => {
  if (!(model instanceof Function)) throw TypeError(`ExecutionPlan model ${model} is not a function.`);
  if (!(executor instanceof Function)) throw TypeError(`ExecutionPlan executor ${executor} is not a function.`);

  const steps = [];

  function ExecutionPlan(...args) {
    const resolver = executor(...args);
    return steps.reduce((promise, { type, fn }) => promise[type](fn), new model(resolver));
  }

  const perform = type => fn => {
    steps.push({ type, fn });
    return ExecutionPlan;
  };

  ExecutionPlan.then = perform('then');
  ExecutionPlan.catch = perform('catch');

  return ExecutionPlan;
};
