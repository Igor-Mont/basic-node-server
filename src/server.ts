import { createServer } from "node:http";
import { Client } from "pg";

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "database-1.chftne5ljznd.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "atividade-3",
});

client
  .connect()
  .then(() => {
    const insert =
      "INSERT INTO bilheteriadigital.horarios(id, hora_inicial, hora_final) VALUES (value1, value2, value3)";
    const values = ["0", "value2", "value3"];

    client.query(insert, values, (err, result) => {
      if (err) {
        console.error("Error inserting data", err);
      } else {
        console.log("Data inserted successfully");
      }

      client.end();
    });
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

/* client.connect().then(() => {
  console.log("Connected with database 📦...");
  server.listen(3000, () => {
    console.log("Server listen on port 3000 🔥...");
  });
  const insertQuery = `insert into bilheteriadigital.administradores (
    id,
    email,
    telefone,
    primeiro_nome,
    segundo_nome,
    cpf,
    data_de_nascimento
    ) values (
      value1,
      value2,
      value3,
      value4,
      value5,
      value6,
      value7
    );`;
  const values = [
    "administrator",
    "administrator@gmail.com",
    "21894350",
    "psodgofd",
    "podkgpd",
    23985095,
    "1235-25-23",
  ];

  client.query(insertQuery, values).then((response) => {
    console.log(response);
  });

  client
    .query("select * from bilheteriadigital.administradores")
    .then((response) => {
      console.log(response.rows);
    });
}); */

const server = createServer((request, response) => {
  response.write("Hello World");

  return response.end();
});
