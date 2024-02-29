import { createServer } from "node:http";
import { Client } from "pg";

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "database-1.chftne5ljznd.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "database-1",
});

const server = createServer((request, response) => {
  response.write("Hello World");

  return response.end();
});

server.listen(3000, () => {
  console.log("rodando...");
});
