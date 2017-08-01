# data-tada

## [API](api.md)

### [Parsers](api.parse.md)

#### Creating a New Parser
As an example, we will create a custom parser for parsing {X,Y} coordinates. You can play around with this example on
[Code Sandbox](https://codesandbox.io/s/vgM4O7Z8M).

##### Step 1: Start with the configuration object.
```js
import { createExecutionPlan, SyncPromise } from 'data-tada';

const createXYParser = ({
  model = SyncPromise,
  required = false,
  minX = Number.NEGATIVE_INFINITY,
  maxX = Number.MAX_VALUE,
  minY = Number.NEGATIVE_INFINITY,
  maxY = Number.MAX_VALUE,
}) => createExecutionPlan(model)(value => (resolve, reject) => {
  // parsing logic will go here
});
```

The configuration object specifies the default configuration of the parser.
The `model` parameter allows the consumer to switch between [SyncPromise](api.sync-promise.md), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), or another promise-like object with `.then()` and `.catch()` functionality.

Once the parser is configured it returns an ExecutionPlan.  The execution plan is a function that allows you to prepend `.then(fn)` and `.catch(fn)` handlers _before_ the value is actually parsed.  If the `model` is a `SyncPromise`, the execution plan will also allow you to utilize a `.value()`, `.value(fn)`, `.value.resolved()`, or `.value.rejected()` handler.  Passing a value to the ExecutionPlan creates the promise with any then/catch handlers and returns it.

```js
// ExecutionPlan example
import { Parse } from 'data-tada';
const plan = Parse.number({ required: true })
  .then(v => 2 * v) // add then/catch statements _before_ parsing a value.
  .catch(e => 0);
plan('123').then(v => v + 1).value(); // 247 (123 was parsed, then doubled, then add 1)
plan('abc').then(v => v + 1).value(); // 1 (rejected as invalid, caught and returned 0, then doubled, then add 1)
```

##### Step 2: Configuring default error messages
```js
import { createExecutionPlan, Message, SyncPromise } from 'data-tada';

const MESSAGES = {
  required: 'Required',
  invalid: 'Invalid',
  minX: 'X Too Low',
  maxX: 'X Too High',
  minY: 'Y Too Low',
  maxY: 'Y Too High',
  validate: 'Invalid',
};

const createXYParser = ({
  model = SyncPromise,
  required = false,
  minX = Number.NEGATIVE_INFINITY,
  maxX = Number.MAX_VALUE,
  minY = Number.NEGATIVE_INFINITY,
  maxY = Number.MAX_VALUE,
  messages,
}) => createExecutionPlan(model)(value => (resolve, reject) => {
  const context = { value };
  const message = new Message(MESSAGES, messages).context(context);
  const rejectWith = err => reject(message.get(err));
  // parsing logic will go here
});
```
The Message object merges the default `MESSAGES` with any `messages` that were supplied to the configuration.  It also allows the message to be defined as a function that will return a value.

```js
const MESSAGES = {
  minX: (rejectKey, context) => `X Too Low, ${context}`,
  ...
}
```

##### Step 3: Parsing the value
```js
import { createExecutionPlan, Message, SyncPromise } from 'data-tada';

const MESSAGES = { ... }; // collapsed for brevity

const createXYParser = ({
  model = SyncPromise,
  required = false,
  minX = Number.NEGATIVE_INFINITY,
  maxX = Number.MAX_VALUE,
  minY = Number.NEGATIVE_INFINITY,
  maxY = Number.MAX_VALUE,
  messages,
}) => createExecutionPlan(model)(value => (resolve, reject) => {
  const context = { value };
  const message = new Message(MESSAGES, messages).context(context);
  const rejectWith = err => reject(message.get(err));

  if(value === null || value === undefined || value === '') {
    return required ? rejectWith('required') : resolve(value);
  }

  if(typeof value !== 'string') {
    return rejectWith('invalid');
  }

  const reg = /^\D*?([-+]?\d+(\.\d*)?)\D+?([-+]?\d+(\.\d*)?)\D*$/;
  const match = value.match(reg);
  if(!match) {
    return rejectWith('invalid');
  }

  const x = context.x = parseFloat(match[1]);
  const y = context.y = parseFloat(match[3]);

  if(x < minX) rejectWith('minX');
  if(x > maxX) rejectWith('maxX');
  if(y < minY) rejectWith('minY');
  if(y > maxY) rejectWith('maxY');

  const pol = v => v < 0 ? '-' : '+';
  const QUADRANT = { '++': 1, '-+': 2, '--': 3, '+-': 4 };
  const quadrant = QUADRANT[pol(x) + pol(y)];

  resolve({ x, y, quadrant });
});
```

We then attempt to parse the input.  When we encounter a problem we just `reject` it with the reason.  Once we successfully parse we `resolve` with the value.

##### Step 4: Using the new parser
```js
const parser = createXYParser({ required: true, minX: -100, maxX: 100, minY: 100, maxY: 100 })
  .then(({x, y, quadrant }) => `{${x},${y}} is in Q${quadrant}`);

parser('loc 23 and -15.3!').value();             // '{23,-15.3} is in Q4'
parser('loc 23 and -15.3!').value.resolved();    // '{23,-15.3} is in Q4'
parser('loc 23 and -15.3!').value.rejected();    // undefined
const upper => s => s.toUpperCase();
parser('loc 23 and -15.3!').then(upper).value(); // '{23,-15.3} IS IN Q4'

parser('loc 123 and -15.3!').value();          // 'X Too High'
parser('loc 123 and -15.3!').value.resolved(); // undefined
parser('loc 123 and -15.3!').value.rejected(); // 'X Too High'
```
