import SyncPromise from "../SyncPromise";

const parseZip = value => {
  if (typeof value === "string") {
    const reg = /^\D*(\d{5})\D*(\d{4})?\D*$/;
    const match = value.match(reg);
    if (match) {
      const [, zip, plus4] = match;
      return {
        zip,
        plus4,
        zipPlus4: zip + (plus4 ? `-${plus4}` : ""),
      };
    }
  }
  return null;
};

export default ({ model = SyncPromise, required = false, validate, parse = parseZip } = {}) => value =>
  new model((resolve, reject) => {
    let result = value && value.toString instanceof Function ? value.toString() : value;
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

    return resolve(result);
  });
