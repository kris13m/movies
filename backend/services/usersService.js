const usersRepository = require('../repositories/usersRepository');

const deleteUser = async (id) => {
  const result = await usersRepository.deleteById(id);

  if (result === 0) {
    return null;
  }
  
  return { success: true };
};


module.exports = {
  deleteUser
};