import "reflect-metadata"
import {createConnection} from "typeorm"
import {ApolloServer, ExpressContext} from 'apollo-server-express'
import express from "express"

const startServer = async () => { 
  await createConnection();
  const server = new ApolloServer({
    context: ({ req, res }: ExpressContext) => ({ req, res }),
  })
  const app = express();
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' });
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })
}

startServer()