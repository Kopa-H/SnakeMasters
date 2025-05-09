
import User from '../../database/models/userModel.mjs'; // Importa el modelo de usuario
import jwt from 'jsonwebtoken'; // Importa la librería jsonwebtoken

const handleRefreshAccessToken = async (req, res) => {
  console.log("\nSe ha recibido una petición para refrescar el ACCESS TOKEN");

  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      // console.log('No hay token de acceso.');
      return res.sendStatus(401);
    }

    const refreshToken = cookies.refreshToken;

    // Busca el usuario en la base de datos por su refreshToken:
    const foundUser = await User.findOne({ refreshToken });

    // Verifica si el usuario existe:
    if (!foundUser) {
      return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || !decoded || foundUser._id.toString() !== decoded._id) {
          return res.sendStatus(403);
        }
        const accessToken = jwt.sign(
            {
              "UserInfo": {
                "_id": foundUser._id,
                }
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '60m' }
    )
        res.json({ accessToken });
    });

  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(500).json({ error: 'Error de autenticación' });
  }
};

export default handleRefreshAccessToken;