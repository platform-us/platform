import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Revenue } from './Revenue';
import { Platform } from './Platform';
import { Tag } from './Tag';

@ObjectType()
@Entity('policies')
export class Policy extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  author: string;

  @Field(() => Revenue)
  @OneToOne(() => Revenue)
  @JoinColumn()
  revenue: Revenue;

  @Field(() => String)
  @Column()
  level: string;

  @Field(() => [Tag])
  @OneToMany(() => Tag, tag => tag.policy)
  tags: Tag[];

  @Field(() => Platform)
  @ManyToOne(() => Platform, platform => platform.policies)
  parent: Platform;

  @Field(() => [Platform])
  @ManyToMany(() => Platform, platform => platform.policies)
  platforms: [Platform];
}
