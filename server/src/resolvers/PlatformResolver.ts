import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import { Platform } from '../entities/Platform';
import { User } from '../entities/User';
import { Context } from '../Context';
import { isAuth } from '../isAuth';

@Resolver()
export class PlatformResolver {
  @Query(() => Platform)
  async platform(@Arg('id') id: string) {
    const platform = await Platform.findOne(id, {
      relations: ['user', 'policies'],
    });
    return platform;
  }

  @Query(() => [Platform], { nullable: true })
  async platforms() {
    const platforms = await Platform.find();
    return platforms;
  }

  @Query(() => [Platform], { nullable: true })
  @UseMiddleware(isAuth)
  async ownPlatforms(@Ctx() { payload }: Context) {
    const platforms = await Platform.find({
      where: { user: { id: payload.userId } },
    });
    return platforms;
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async createPlatform(
    @Arg('name') name: string,
    @Arg('author', { nullable: true }) author: string,
    @Arg('summary', { nullable: true }) summary: string,
    @Ctx() { payload }: Context
  ) {
    const user = await User.findOne({ where: { id: payload.userId } });

    const platform = await Platform.insert({ name, author, summary, user });

    return platform.identifiers[0].id;
  }
}
