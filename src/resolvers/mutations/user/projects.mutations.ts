import { Resolver, Mutation, Arg } from 'type-graphql';
import { UserProjects } from 'src/entities/Projects';

@Resolver()
export class UserProjectsMutations {
  @Mutation(() => UserProjects)
  async createProject(@Arg('input') input: UserProjects): Promise<UserProjects> {
    const project = await UserProjects.create(input).save();

    return project;
  }
}
