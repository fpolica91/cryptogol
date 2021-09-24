import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import UserSchema from "../schemas/User.Schema";

@InputType()
class UserInput {
  @Field()
  email: String;

  @Field()
  password: String;

  @Field()
  wallet: String;
}

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("userInput") userInput: UserInput) {
    try {
      const user = await UserSchema.create(userInput);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  @Query(() => [User])
  async getUsers() {
    const users = await UserSchema.find();
    return users;
  }
}

export { UserResolver };
