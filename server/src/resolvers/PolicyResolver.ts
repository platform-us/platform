import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import { Policy } from '../entities/Policy';
import { Platform } from '../entities/Platform';
import { Context } from '../Context';
import { isAuth } from '../isAuth';
import { Like } from 'typeorm';

@Resolver()
export class PolicyResolver {
  @Query(() => Policy)
  async policy(@Arg('id') id: string) {
    const policy = await Policy.findOne(id, {
      relations: ['tags', 'parent', 'revenue'],
    });
    return policy;
  }

  @Query(() => [Policy], { nullable: true })
  async policies() {
    const policies = await Policy.find({
      relations: ['tags', 'parent', 'revenue'],
    });
    return policies;
  }

  @Query(() => [Policy], { nullable: true })
  async searchPolicies(@Arg('name') name: string) {
    const policies = await Policy.find({
      relations: ['tags', 'parent', 'revenue'],
      where: { name: Like(`%${name}%`) },
    });
    return policies;
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async createPolicy(
    @Arg('name') name: string,
    @Arg('author', { nullable: true }) author: string,
    @Arg('platform_id', { nullable: true }) platform_id: string,
    @Ctx() { payload }: Context
  ) {
    const parent = await Platform.findOne({
      relations: ['user'],
      where: { id: platform_id, user: { id: payload.userId } },
    });

    if (!parent) throw Error('Platform not found');

    const policy = await Policy.insert({ name, author, parent });

    return policy.identifiers[0].id;
  }
}
