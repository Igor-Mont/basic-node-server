var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_http = require("http");
var import_pg = require("pg");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
console.log(process.env.PASSWORD);
var client = new import_pg.Client({
  user: process.env.USER,
  password: "postgres",
  host: "database-1.chftne5ljznd.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "atividade-3"
});
client.connect().then(() => console.log("Connected with database \u{1F4E6}...")).catch((err) => console.error("Error connecting to database", err));
var server = (0, import_http.createServer)(
  async (request, response) => {
    if (request.method === "GET") {
      try {
        const { rows } = await client.query(
          "SELECT * FROM bilheteriadigital.administradores"
        );
        response.writeHead(200, { "Content-Type": "application/json" });
        return response.end(JSON.stringify(rows));
      } catch (error) {
        console.error(error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        return response.end("Internal Server Error");
      }
    }
    if (request.method === "POST") {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", async () => {
        try {
          const data = JSON.parse(body);
          const {
            id,
            email,
            telefone,
            primeiro_nome,
            segundo_nome,
            cpf,
            data_de_nascimento
          } = data;
          const insertQuery = `INSERT INTO bilheteriadigital.administradores (
            id,
            email,
            telefone,
            primeiro_nome,
            segundo_nome,
            cpf,
            data_de_nascimento
          ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7)`;
          const values = [
            id,
            email,
            telefone,
            primeiro_nome,
            segundo_nome,
            cpf,
            data_de_nascimento
          ];
          await client.query(insertQuery, values);
          const insertedData = await client.query(
            `SELECT * FROM bilheteriadigital.administradores WHERE id = $1`,
            [values[0]]
          );
          const newAdm = insertedData.rows[0];
          response.writeHead(200, { "Content-Type": "application/json" });
          return response.end(JSON.stringify(newAdm));
        } catch (error) {
          console.error(error);
          response.writeHead(500, { "Content-Type": "text/plain" });
          return response.end("Internal Server Error");
        }
      });
    }
    if (request.method === "DELETE") {
      try {
        await client.query("DELETE FROM bilheteriadigital.administradores");
        response.statusCode = 200;
        return response.end();
      } catch (error) {
        console.error(error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        return response.end("Internal Server Error");
      }
    }
  }
);
server.listen(3e3, () => {
  console.log("Server listen on port 3000 \u{1F525}...");
});
