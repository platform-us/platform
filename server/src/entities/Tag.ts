import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Policy } from './Policy';

@ObjectType()
@Entity('tags')
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Policy)
  @ManyToOne(() => Policy, policy => policy.tags)
  policy: Policy;
}
