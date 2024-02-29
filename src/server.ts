import { createServer } from "node:http";
import { Client } from "pg";

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "database-1.chftne5ljznd.us-east-1.rds.amazonaws.com",
  port: 5432,
});

client.connect().then(() => {
  console.log("Connected with database 📦...");
  server.listen(3000, () => {
    console.log("Server listen on port 3000 🔥...");
  });
});

const server = createServer((request, response) => {
  response.write("Hello World");

  return response.end();
});
