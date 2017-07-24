import SyncPromise from "../SyncPromise";

const parseSsn = value => {
  if (typeof value === "string") {
    const reg = /^\D*(\d{3})\D*(\d{2})\D*(\d{4})\D*$/;
    const match = value.match(reg);
    if(match) {
      const [,first3,middle2,last4] = match;
      return {
        ssn: `${first3}-${middle2}-${last4}`,
        first3,
        middle2,
        last4,
      }
    }
  }
  return null;
};

export default (
  { model = SyncPromise, required = false, validate, parse = parseSsn } = {}
) => value =>
  new model((resolve, reject) => {
    let result =
      value && value.toString instanceof Function ? value.toString() : value;
    if (result === null || result === undefined || result === "") {
      return required ? reject("required") : resolve(result);
    }

    result = parse(result);
    if (!result) {
      return reject("invalid");
    }

    if (validate instanceof Function && !validate(result)) {
      return reject("validate");
    }

    resolve(result);
  });
