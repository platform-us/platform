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
import { ContextType } from '../ContextType';
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

  @Query(() => [Platform])
  async platforms() {
    const platforms = await Platform.find();
    return platforms;
  }

  @Query(() => [Platform])
  async platformsByUsername(
    @Arg('username') username: string,
    @Arg('take', { nullable: true }) take: number
  ) {
    const platforms = await Platform.createQueryBuilder('platform')
      .leftJoinAndSelect('platform.user', 'user')
      .where('user.username = :username', { username })
      .take(take)
      .getMany();
    return platforms;
  }

  @Query(() => [Platform])
  @UseMiddleware(isAuth)
  async ownPlatforms(@Ctx() { payload }: ContextType) {
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
    @Ctx() { payload }: ContextType
  ) {
    const user = await User.findOne({ where: { id: payload.userId } });

    const platform = await Platform.insert({ name, author, summary, user });

    return platform.identifiers[0].id;
  }
}
