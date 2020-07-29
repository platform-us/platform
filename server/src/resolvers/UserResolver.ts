import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  // UseMiddleware,
  // Int,
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
// import { getConnection } from 'typeorm';

import { User } from '../entities/User';
import { ContextType } from '../ContextType';
import { createRefreshToken, createAccessToken } from '../auth';
// import { isAuth } from '../isAuth';
import { sendRefreshToken } from '../sendRefreshToken';
import { verify } from 'jsonwebtoken';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hello World';
  }

  // @Query(() => [User])
  // users() {
  //   return User.find();
  // }

  @Query(() => User, { nullable: true })
  async user(@Arg('username') username: string) {
    const user = await User.findOne({ where: { username } });

    return user || null;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: ContextType) {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashed = await hash(password, 12);

    try {
      await User.insert({ username, email, password: hashed });
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { res }: ContextType
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('Password invalid');
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }

  // revoke refresh token (aka log user out)
  //

  // @Mutation(() => Boolean)
  // async revokeRefreshTokenForUser(@Arg('userId', () => Int) userId: number) {
  //   await getConnection()
  //     .getRepository(User)
  //     .increment({ id: userId }, 'tokenVersion', 1);
  // }
}
