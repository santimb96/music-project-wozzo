import express from 'express';
import bodyParser from 'body-parser';
/**
 * IMPORTAMOS RUTAS DE LOS DISTINTOS MODELOS
 */
import User from './routes/user.js';
import Artist from './routes/artist.js';
import Song from './routes/song.js';
import UserRole from './routes/userRole.js';
/**
 *
 */
import UserRoleModel from './models/userRole.js';
import { conn } from './config/database.js';
import { config }  from './config/config.js';
import { masterToken } from './config/masterToken.js';
import jwt  from 'jsonwebtoken';

const app = express();

app.set('masterKey', masterToken);

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.replace(/^Bearer\s+/, '');
  //console.warn(token);
  if(token){
    jwt.verify(token, app.get('masterKey'), (err, decoded) => {
      if(err) {
        return res.json({
          success: false,
          message: 'Token no válido'
        });
      }
      const user = decoded.user;
      UserRoleModel.findOne({name: user.userRoleId})
        .then(userRoleName => userRoleName? console.info('Rol encontrado para' + user.name + ':' + userRoleName.name) : console.error('Rol no encontrado'))
        .catch((err) => console.error(err));
    });
  }
  else {
    return res.json({
      success: false,
      message: 'No se ha obtenido token'
    });
  }
  // coger el token
  // descifrar el token
  // mirar que user es
  // mirar el userRole
  // si es correcto dejar pasar
  // si no es correcto no dejar pasar
  // todo hacer un archivo de rutas por userRole
};



//Nos permite manejar peticiones y enviar respuesta en formato json
app.use(bodyParser.json());
//De esta manera indicamos que no vamos a recibir peticiones enviadas directamente de un formulario, sino que sera todo enviado en json
app.use(bodyParser.urlencoded({
  extended: false
}));

//app.use(verifyToken);

app.listen(config.PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Servidor corriendo en el puerto: ${config.PORT}`);
});

conn.connect();

app
  .use('/users', User)
  .use('/artists', Artist)
  .use('/songs', Song)
  .use('/userRoles', UserRole);

export {
  app
};