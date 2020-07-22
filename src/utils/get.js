
const get = (object, stringPath, returnValue = null) => {
  if (!object || !Object.keys(object).length) {
    return returnValue;
  }

  if (!stringPath) {
    return object || null;
  }

  const parts = stringPath.includes('.') ? stringPath.split('.') : [stringPath];

  let currentValue = object;

  parts.forEach(part => {
    currentValue = currentValue[part];

    if (!currentValue) {
      return returnValue;
    }
  });

  return currentValue;
};

export default get;