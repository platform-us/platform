import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from './User';
import { Policy } from './Policy';

@ObjectType()
@Entity('platforms')
export class Platform extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ nullable: true, default: null })
  author: string;

  @Field(() => String)
  @Column({ nullable: true, default: null })
  summary: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.platforms, {
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  user: User;

  @Field(() => [Policy], { nullable: true })
  @ManyToMany(() => Policy, policy => policy.platforms)
  @JoinTable()
  policies: [Policy];
}
