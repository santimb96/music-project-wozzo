import express from "express";
import bodyParser from "body-parser";
/**
 * IMPORTAMOS RUTAS DE LOS DISTINTOS MODELOS
 */
import User from "./routes/user.js";
import Artist from "./routes/artist.js";
import Song from "./routes/song.js";
import UserRole from "./routes/userRole.js";
import { conn } from "./config/database.js";
import { config } from "./config/config.js";
import { masterToken } from "./config/masterToken.js";
import jwt from "jsonwebtoken";
import routes from "./utils/routes.js";
import handleError from "./controllers/errorController.js";
import cors from "cors";

const app = express();
app.use(cors());

app.set("masterKey", masterToken);

const verifyToken = (req, res, next) => {
  // cogemos el token desde los headers
  const token =
    typeof req.headers.authorization !== "undefined"
      ? req.headers.authorization.replace(/^Bearer\s+/, "")
      : false;
  // valoramos si el path es public para que el user haga login
  console.log(req.path);
  if (
    !req.path.includes("users") &&
    req.method === "GET" &&
    !req.path.includes("userRoles") &&
    req.method === "GET"
  ) {
    next();
  } else if (
    req.path.includes("login") ||
    req.path.includes("autologin") ||
    req.path.includes("register")
  ) {
    next();
  } else if (token) {
    //verificamos que existe token; si no, sale; si sí, verificamos que sea correcto
    jwt.verify(token, app.get("masterKey"), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token no válido",
        });
      } else {
        // valoramos ruta que nos llega con las rutas disponibles para X rol
        const availableRoutes = routes[decoded?.user?.userRoleId?.name];
        const route = req.path;
        const fixUrl =
          route.search(/[0-9]/) !== -1
            ? route.slice(0, route.lastIndexOf("/") + 1)
            : route;
        const headerMethod = req.method;
        const foundRoute = availableRoutes.find(
          (r) =>
            fixUrl ===
              (r.route.indexOf(":") ? r.route.split(":")[0] : r.route) &&
            r.method === headerMethod
        );
        if (foundRoute) {
          //operación autorizada para X usuario
          console.log("success!");
          next();
        } else {
          // operación no autorizada para X usuario
          handleError(404, "No autorizado", res);
        }
      }
    });
  } else {
    return res.json({
      success: false,
      message: "No se ha obtenido token",
    });
  }
};

//Nos permite manejar peticiones y enviar respuesta en formato json
app.use(bodyParser.json());
//De esta manera indicamos que no vamos a recibir peticiones enviadas directamente de un formulario, sino que sera todo enviado en json
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// app.use(verifyToken);

app.listen(config.PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Servidor corriendo en el puerto: ${config.PORT}`);
});

conn.connect();

app
  .use("/users", User)
  .use("/artists", Artist)
  .use("/songs", Song)
  .use("/userRoles", UserRole);

export { app };
