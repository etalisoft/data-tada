export default value => typeof value === 'string' ? value : value ? value.password : value;
