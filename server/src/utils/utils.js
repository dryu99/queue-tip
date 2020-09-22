/**
 * @param {object[]} array
 * @param {string} id
 * @param {string} [propName] - name of id property (might not be id)
 */
const removeIdFromArray = (array, id, propName='id') => {
  const index = array.findIndex(el => el[propName] === id);
  if (index === -1) {
    // throw new Error(`Id ${id} not found in array`);
    return null;
  }

  return array.splice(index, 1)[0];
};

module.exports = {
  removeIdFromArray
};
