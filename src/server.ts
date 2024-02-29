import { createServer } from "node:http";
import { Client } from "pg";

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "database-1.chftne5ljznd.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "atividade-3",
});

const server = createServer((request, response) => {
  if (request.method === "GET") {
    console.log("GET");
    client.connect().then(() => {
      client
        .query("SELECT * FROM bilheteriadigital.administradores")
        .then((data) => {
          console.log("data");
          console.log(data.rows);
          response.write("test");
          client.end();
        });
    });

    return response.end();
  }

  if (request.method === "POST") {
    console.log("POST");

    client.connect().then(() => {
      console.log("Connected with database 📦...");
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
          $7
          );`;
      const values = [
        "administrator",
        "administrator@gmail.com",
        "21894350",
        "psodgofd",
        "podkgpd",
        23985095,
        "2024-02-29T12:34:56+00:00",
      ];

      client.query(insertQuery, values).then((data) => {
        console.log(data);
        response.write(data);
        client.end();
      });

      return response.end();
    });
  }

  return response.end();
});

server.listen(3000, () => {
  console.log("Server listen on port 3000 🔥...");
});
