import "reflect-metadata";
import "./utils/connection";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { buildSchema } from "type-graphql";

async function startServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const server = new ApolloServer({ schema });
  server.listen(
    { port: 4000 },
    console.log("server running on port localhost:4000, 🚀 ")
  );
}

startServer();
