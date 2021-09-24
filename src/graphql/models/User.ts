import { ObjectType, Field } from "type-graphql";
@ObjectType()
export class User {
  @Field()
  email: String;

  @Field()
  password: String;

  @Field()
  wallet: String;
}
