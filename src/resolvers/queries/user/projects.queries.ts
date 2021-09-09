import { UserProjects } from 'src/entities/Projects';
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class ProjectQueries {
  @Query(() => [UserProjects])
  async projects(): Promise<UserProjects[]> {
    const projects = await UserProjects.find();

    return projects;
  }
}
