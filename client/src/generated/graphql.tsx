import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  user?: Maybe<User>;
  me?: Maybe<User>;
  platform: Platform;
  platforms: Array<Platform>;
  platformsByUsername: Array<Platform>;
  ownPlatforms: Array<Platform>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryPlatformArgs = {
  id: Scalars['String'];
};


export type QueryPlatformsByUsernameArgs = {
  take?: Maybe<Scalars['Float']>;
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  tokenVersion: Scalars['String'];
  platforms?: Maybe<Array<Platform>>;
};

export type Platform = {
  __typename?: 'Platform';
  id: Scalars['String'];
  name: Scalars['String'];
  author: Scalars['String'];
  summary: Scalars['String'];
  user: User;
  policies?: Maybe<Array<Policy>>;
};

export type Policy = {
  __typename?: 'Policy';
  id: Scalars['String'];
  name: Scalars['String'];
  author: Scalars['String'];
  revenue: Revenue;
  level: Scalars['String'];
  tags: Array<Tag>;
  parent: Platform;
  platforms: Array<Platform>;
};

export type Revenue = {
  __typename?: 'Revenue';
  decrease: Scalars['Int'];
  increase: Scalars['Int'];
  policy: Policy;
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
  policy: Policy;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login: LoginResponse;
  createPlatform: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreatePlatformArgs = {
  summary?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type PlatformQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PlatformQuery = (
  { __typename?: 'Query' }
  & { platform: (
    { __typename?: 'Platform' }
    & Pick<Platform, 'id' | 'name' | 'author' | 'summary'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), policies?: Maybe<Array<(
      { __typename?: 'Policy' }
      & Pick<Policy, 'id' | 'name' | 'author' | 'level'>
      & { revenue: (
        { __typename?: 'Revenue' }
        & Pick<Revenue, 'increase' | 'decrease'>
      ), tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'name'>
      )>, parent: (
        { __typename?: 'Platform' }
        & Pick<Platform, 'id' | 'name'>
      ), platforms: Array<(
        { __typename?: 'Platform' }
        & Pick<Platform, 'id' | 'name'>
      )> }
    )>> }
  ) }
);

export type UserPlatformsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserPlatformsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
    & { platforms?: Maybe<Array<(
      { __typename?: 'Platform' }
      & Pick<Platform, 'id' | 'name' | 'author'>
      & { policies?: Maybe<Array<(
        { __typename?: 'Policy' }
        & Pick<Policy, 'name'>
      )>> }
    )>> }
  )> }
);

export type CreatePlatformMutationVariables = Exact<{
  name: Scalars['String'];
  author?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
}>;


export type CreatePlatformMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPlatform'>
);

export type UserDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDetailsQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
export const PlatformDocument = gql`
    query Platform($id: String!) {
  platform(id: $id) {
    id
    name
    author
    summary
    user {
      username
    }
    policies {
      id
      name
      author
      revenue {
        increase
        decrease
      }
      level
      tags {
        name
      }
      parent {
        id
        name
      }
      platforms {
        id
        name
      }
    }
  }
}
    `;

/**
 * __usePlatformQuery__
 *
 * To run a query within a React component, call `usePlatformQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatformQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatformQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlatformQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlatformQuery, PlatformQueryVariables>) {
        return ApolloReactHooks.useQuery<PlatformQuery, PlatformQueryVariables>(PlatformDocument, baseOptions);
      }
export function usePlatformLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlatformQuery, PlatformQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlatformQuery, PlatformQueryVariables>(PlatformDocument, baseOptions);
        }
export type PlatformQueryHookResult = ReturnType<typeof usePlatformQuery>;
export type PlatformLazyQueryHookResult = ReturnType<typeof usePlatformLazyQuery>;
export type PlatformQueryResult = ApolloReactCommon.QueryResult<PlatformQuery, PlatformQueryVariables>;
export const UserPlatformsDocument = gql`
    query UserPlatforms($username: String!) {
  user(username: $username) {
    id
    username
    email
    platforms {
      id
      name
      author
      policies {
        name
      }
    }
  }
}
    `;

/**
 * __useUserPlatformsQuery__
 *
 * To run a query within a React component, call `useUserPlatformsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPlatformsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPlatformsQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserPlatformsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserPlatformsQuery, UserPlatformsQueryVariables>) {
        return ApolloReactHooks.useQuery<UserPlatformsQuery, UserPlatformsQueryVariables>(UserPlatformsDocument, baseOptions);
      }
export function useUserPlatformsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserPlatformsQuery, UserPlatformsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserPlatformsQuery, UserPlatformsQueryVariables>(UserPlatformsDocument, baseOptions);
        }
export type UserPlatformsQueryHookResult = ReturnType<typeof useUserPlatformsQuery>;
export type UserPlatformsLazyQueryHookResult = ReturnType<typeof useUserPlatformsLazyQuery>;
export type UserPlatformsQueryResult = ApolloReactCommon.QueryResult<UserPlatformsQuery, UserPlatformsQueryVariables>;
export const CreatePlatformDocument = gql`
    mutation CreatePlatform($name: String!, $author: String, $summary: String) {
  createPlatform(name: $name, author: $author, summary: $summary)
}
    `;
export type CreatePlatformMutationFn = ApolloReactCommon.MutationFunction<CreatePlatformMutation, CreatePlatformMutationVariables>;

/**
 * __useCreatePlatformMutation__
 *
 * To run a mutation, you first call `useCreatePlatformMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlatformMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlatformMutation, { data, loading, error }] = useCreatePlatformMutation({
 *   variables: {
 *      name: // value for 'name'
 *      author: // value for 'author'
 *      summary: // value for 'summary'
 *   },
 * });
 */
export function useCreatePlatformMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePlatformMutation, CreatePlatformMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePlatformMutation, CreatePlatformMutationVariables>(CreatePlatformDocument, baseOptions);
      }
export type CreatePlatformMutationHookResult = ReturnType<typeof useCreatePlatformMutation>;
export type CreatePlatformMutationResult = ApolloReactCommon.MutationResult<CreatePlatformMutation>;
export type CreatePlatformMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePlatformMutation, CreatePlatformMutationVariables>;
export const UserDetailsDocument = gql`
    query UserDetails {
  me {
    id
    username
    email
  }
}
    `;

/**
 * __useUserDetailsQuery__
 *
 * To run a query within a React component, call `useUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserDetailsQuery, UserDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<UserDetailsQuery, UserDetailsQueryVariables>(UserDetailsDocument, baseOptions);
      }
export function useUserDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserDetailsQuery, UserDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserDetailsQuery, UserDetailsQueryVariables>(UserDetailsDocument, baseOptions);
        }
export type UserDetailsQueryHookResult = ReturnType<typeof useUserDetailsQuery>;
export type UserDetailsLazyQueryHookResult = ReturnType<typeof useUserDetailsLazyQuery>;
export type UserDetailsQueryResult = ApolloReactCommon.QueryResult<UserDetailsQuery, UserDetailsQueryVariables>;