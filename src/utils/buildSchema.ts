import {resolve} from "path"
import { GraphQLSchema } from "graphql"
import { buildSchema } from "type-graphql"

export const schema =():Promise<GraphQLSchema> => buildSchema({
  resolvers: [resolve('src/resolvers/**/*.{mutations,queries}.{ts,js}')],
  emitSchemaFile: resolve('schema.gql'),
})