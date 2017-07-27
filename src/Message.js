export default function Message(...messages) {
  const dictionary = Object.assign({}, ...messages);

  let context;
  this.context = value => {
    context = value;
    return this;
  };

  this.get = key => {
    const entry = dictionary[key] || key;
    return entry instanceof Function ? entry(key, context) : entry;
  };
}
