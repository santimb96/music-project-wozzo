const express = require("express");
const bodyParser = require("body-parser");
/**
 * IMPORTAMOS RUTAS DE LOS DISTINTOS MODELOS
 */
const User = require("./routes/user");
const Artist = require("./routes/artist");
const Song = require("./routes/song");
const UserRole = require("./routes/userRole");
/**
 *
 */
const app = express();
const Database = require("./config/database");
const CONFIG = require("./config/config");

//Nos permite manejar peticiones y enviar respuesta en formato json
app.use(bodyParser.json());
//De esta manera indicamos que no vamos a recibir peticiones enviadas directamente de un formulario, sino que sera todo enviado en json
app.use(bodyParser.urlencoded({ extended: false }));

app
  .use("/users", User)
  .use("/artists", Artist)
  .use("/songs", Song)
  .use("/userRoles", UserRole);

Database.connect();

app.listen(CONFIG.PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Servidor corriendo en el puerto: ${CONFIG.PORT}`);
});

module.exports = app;
