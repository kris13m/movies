const userService = require('../services/usersService');

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usersService.deleteUser(id);

    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(204).send();

  } catch (error) {
    console.error('Error in usersController.deleteUser:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  deleteUser
};