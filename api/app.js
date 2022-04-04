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
import { conn } from './config/database.js';
import { config }  from './config/config.js';
import { masterToken } from './config/masterToken.js';

const app = express();

app.set('masterKey', masterToken);

//Nos permite manejar peticiones y enviar respuesta en formato json
app.use(bodyParser.json());
//De esta manera indicamos que no vamos a recibir peticiones enviadas directamente de un formulario, sino que sera todo enviado en json
app.use(bodyParser.urlencoded({
  extended: false
}));

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