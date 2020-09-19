const removeIdFromArray = (array, id) => {
  const index = array.findIndex(el => el.id === id);
  if (index === -1) {
    // throw new Error(`Id ${id} not found in array`);
    return null;
  }

  return array.splice(index, 1)[0];
};

module.exports = {
  removeIdFromArray
};
