import { createServer, IncomingMessage, ServerResponse } from "http";
import { Client } from "pg";

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "database-1.chftne5ljznd.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "atividade-3",
});

client.connect()
  .then(() => console.log("Connected with database 📦..."))
  .catch(err => console.error('Error connecting to database', err));

const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method === "GET") {
    console.log("GET");

    try {
      const { rows } = await client.query("SELECT * FROM bilheteriadigital.administradores");
      console.log("data");
      console.log(rows);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(rows));
    } catch (error) {
      console.error(error);
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Internal Server Error");
    }
  }

  if (request.method === "POST") {
    console.log("POST");

    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const { id, email, telefone, primeiro_nome, segundo_nome, cpf, data_de_nascimento } = data;
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
        console.log(data);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end("Data inserted successfully");
      } catch (error) {
        console.error(error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Internal Server Error");
      }
    });
  }
});

server.listen(3000, () => {
  console.log("Server listen on port 3000 🔥...");
});
