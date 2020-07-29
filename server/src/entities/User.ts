import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Platform } from './Platform';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({
    unique: true,
  })
  username: string;

  @Field(() => String)
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column('int', { default: 0 })
  tokenVersion: string;

  @Field(() => [Platform])
  @OneToMany(() => Platform, platform => platform.user)
  platforms: [Platform];
}
