import { Length } from 'class-validator';
import { Field, ObjectType, InputType } from 'type-graphql';
import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn } from 'typeorm';
// NOTE this is a comment
const PROJECT_CONSTANTS = {
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 5,
  MAX_DESCRIPTION_LENGTH: 400,
};

@Entity()
@ObjectType('UserProjectType')
@InputType('UserProjectInput')
export class UserProjects extends BaseEntity {
  // TODO: fix name
  @PrimaryGeneratedColumn('uuid', { name: 'project_id' })
  @Field({ nullable: true })
  projectId: string;

  @Column()
  @Field({ nullable: true })
  @Length(PROJECT_CONSTANTS.MIN_TITLE_LENGTH, PROJECT_CONSTANTS.MAX_TITLE_LENGTH)
  title: string;

  @Column()
  @Field({ nullable: true })
  @Length(PROJECT_CONSTANTS.MIN_DESCRIPTION_LENGTH, PROJECT_CONSTANTS.MAX_DESCRIPTION_LENGTH)
  description: string;

  // TODO: should be user foreign key
  @Column({ name: 'user_id' })
  @Field({ nullable: true })
  userId: string;

  // TODO: should be user businesses foreign key
  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  businesses: string[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_on' })
  createdOn: Date;
}
