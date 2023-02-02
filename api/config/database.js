import mongoose from "mongoose";
import { config } from "./config.js";

export const conn = {
  connection: null,
  connect: function () {
    console.warn(config.DB);
    if (this.connection) return this.connection;
    return mongoose
      .connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true })
      .then((connection) => {
        this.connection = connection;
        console.log("Conexion a DB con éxito!");
      })
      .catch((err) => console.log(err));
  },
};
