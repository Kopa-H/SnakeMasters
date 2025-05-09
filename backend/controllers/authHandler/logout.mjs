import User from '../../database/models/userModel.mjs';

const handleLogout = async (req, res) => {
  console.log("\nSe ha recibido una petición para hacer logout");

  try {

    const cookies = req.cookies;

    if (!cookies?.refreshToken) {
      return res.sendStatus(204);
    }

    const refreshToken = cookies.refreshToken;

    // Busca el usuario en la base de datos por su refreshToken:
    const foundUser = await User.findOne({ refreshToken });

    // Verifica si el usuario existe:
    if (!foundUser) {
      res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true});
      return res.sendStatus(204);
    }

		// Delete the refresh token from the user in the database
		foundUser.refreshToken = '';
		await foundUser.save();

		res.clearCookie('refreshToken', { httpOnly: true, SameSite: 'none', secure: true});
		res.sendStatus(204);

  } catch (error) {
    console.error('Error al hacer logout:', error);
    res.status(500).json({ error: 'Error al hacer logout' });
  }
};

export default handleLogout;