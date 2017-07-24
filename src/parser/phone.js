import SyncPromise from '../SyncPromise';

const parsePhone = value => {
  if (typeof value === 'string') {
    const groups = [];
    let prev = 0;
    value.replace(/\d+/g, (nums, i) => {
      if (nums.length) {
        groups.push({
          nums,
          prev: value.slice(prev, i),
        });
      }
      prev = i + nums.length;
    });

    const phone = { parts: [] };
    let state = 0;
    while (groups.length) {
      const last = groups[groups.length - 1];
      const { nums, prev } = last;
      if (!nums.length) {
        groups.pop();
        continue;
      }
      switch (state) {
        case 0: // start
          if (prev.toLowerCase().includes('x')) {
            // extension
            phone.extension = nums;
            phone.parts.unshift(nums);
            groups.pop();
            state = 1;
            continue;
          }
          state = 1;
          continue;
        case 1: // last4
          if (nums.length < 4) return null;
          phone.last4 = nums.slice(-4);
          phone.parts.unshift(phone.last4);
          last.nums = nums.slice(0, nums.length - 4);
          state = 2;
          continue;
        case 2: // middle3
          if (nums.length < 3) return null;
          phone.local3 = nums.slice(-3);
          phone.parts.unshift(phone.local3);
          last.nums = nums.slice(0, nums.length - 3);
          state = 3;
          continue;
        case 3: // areaCode
          if (nums.length < 3) return null;
          phone.areaCode = nums.slice(-3);
          phone.parts.unshift(phone.areaCode);
          last.nums = nums.slice(0, nums.length - 3);
          state = 4;
          continue;
        case 4: // end
          if (nums === '1') {
            last.nums = '';
            continue;
          }
          return null;
      }
    }

    if (phone.parts.length < 2) {
      return null;
    }

    return {
      phone:
        (phone.areaCode ? `(${phone.areaCode}) ` : '') +
        `${phone.local3}-${phone.last4}` +
        (phone.extension ? ` ext. ${phone.extension}` : ''),
      areaCode: null,
      local3: null,
      last4: null,
      extension: null,
      parts: [],
      ...phone,
    };
  }
  return null;
};

export default ({ model = SyncPromise, required = false, validate, parse = parsePhone } = {}) => value =>
  new model((resolve, reject) => {
    let result = value && value.toString instanceof Function ? value.toString() : value;
    if (result === null || result === undefined || result === '') {
      return required ? reject('required') : resolve(result);
    }

    result = parse(result);

    if (!result) {
      return reject('invalid');
    }

    if (validate instanceof Function && !validate(result)) {
      return reject('validate');
    }

    return resolve(result);
  });
