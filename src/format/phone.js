export default {
  default: ({ areaCode, parts }) =>
    areaCode.startsWith('8') ? parts.join('-') : `(${parts[0]}) ${parts[1]}-${parts[2]}`,
};
