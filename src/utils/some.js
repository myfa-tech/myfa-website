
const some = (collection, object) => {
  for (let i=0; i<collection.length; i++) {
    if (JSON.stringify(collection[i]) == JSON.stringify(object)) {
      return true;
    }
  }

  return false;
};

export default some;