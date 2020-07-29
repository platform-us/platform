import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Policy } from './Policy';

@ObjectType()
@Entity('revenues')
export class Revenue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column('int')
  decrease: number;

  @Field(() => Int)
  @Column('int')
  increase: number;

  @Field(() => Policy)
  @ManyToOne(() => Policy, policy => policy.tags)
  policy: Policy;
}
