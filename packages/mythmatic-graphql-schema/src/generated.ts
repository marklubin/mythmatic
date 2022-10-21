import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Feed = {
  __typename?: 'Feed';
  count: Scalars['Int'];
  id?: Maybe<Scalars['ID']>;
  links: Array<Link>;
};

export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Int'];
  postedBy?: Maybe<User>;
  url: Scalars['String'];
  voters: Array<User>;
};

export type LinkOrderByInput = {
  createdAt?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  url?: InputMaybe<Sort>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deletePost: Scalars['Boolean'];
  login: AuthPayload;
  post: Link;
  signup: AuthPayload;
  startRenderTask: RenderTask;
  updatePost?: Maybe<Link>;
  vote?: Maybe<Vote>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationPostArgs = {
  description: Scalars['String'];
  url: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationStartRenderTaskArgs = {
  input: RenderTaskInput;
};


export type MutationUpdatePostArgs = {
  description: Scalars['String'];
  id: Scalars['Int'];
  url: Scalars['String'];
};


export type MutationVoteArgs = {
  linkId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  feed: Feed;
  getRenderTask: RenderTask;
};


export type QueryFeedArgs = {
  filter?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Array<LinkOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetRenderTaskArgs = {
  taskId: Scalars['String'];
};

export type RenderTask = {
  __typename?: 'RenderTask';
  errorMessage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  payloadUrl?: Maybe<Scalars['String']>;
  status: RenderTaskStatus;
};

export type RenderTaskInput = {
  prompt: Scalars['String'];
};

export enum RenderTaskStatus {
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Processing = 'Processing'
}

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  Votes: Array<Link>;
  email: Scalars['String'];
  id: Scalars['Int'];
  links: Array<Link>;
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  link: Link;
  user: User;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Feed: ResolverTypeWrapper<Feed>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Link: ResolverTypeWrapper<Link>;
  LinkOrderByInput: LinkOrderByInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RenderTask: ResolverTypeWrapper<RenderTask>;
  RenderTaskInput: RenderTaskInput;
  RenderTaskStatus: RenderTaskStatus;
  Sort: Sort;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  Vote: ResolverTypeWrapper<Vote>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Feed: Feed;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Link: Link;
  LinkOrderByInput: LinkOrderByInput;
  Mutation: {};
  Query: {};
  RenderTask: RenderTask;
  RenderTaskInput: RenderTaskInput;
  String: Scalars['String'];
  User: User;
  Vote: Vote;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  voters?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  post?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationPostArgs, 'description' | 'url'>>;
  signup?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'name' | 'password'>>;
  startRenderTask?: Resolver<ResolversTypes['RenderTask'], ParentType, ContextType, RequireFields<MutationStartRenderTaskArgs, 'input'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'description' | 'id' | 'url'>>;
  vote?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<MutationVoteArgs, 'linkId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  feed?: Resolver<ResolversTypes['Feed'], ParentType, ContextType, Partial<QueryFeedArgs>>;
  getRenderTask?: Resolver<ResolversTypes['RenderTask'], ParentType, ContextType, RequireFields<QueryGetRenderTaskArgs, 'taskId'>>;
};

export type RenderTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['RenderTask'] = ResolversParentTypes['RenderTask']> = {
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payloadUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['RenderTaskStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  Votes?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = {
  link?: Resolver<ResolversTypes['Link'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Feed?: FeedResolvers<ContextType>;
  Link?: LinkResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RenderTask?: RenderTaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
};


export type StartRenderTaskMutationVariables = Exact<{
  input: RenderTaskInput;
}>;


export type StartRenderTaskMutation = { __typename?: 'Mutation', startRenderTask: { __typename?: 'RenderTask', id: string, status: RenderTaskStatus } };

export type GetRenderTaskQueryVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type GetRenderTaskQuery = { __typename?: 'Query', getRenderTask: { __typename?: 'RenderTask', id: string, status: RenderTaskStatus, payloadUrl?: string | null, errorMessage?: string | null } };


export const StartRenderTaskDocument = gql`
    mutation StartRenderTask($input: RenderTaskInput!) {
  startRenderTask(input: $input) {
    id
    status
  }
}
    `;
export type StartRenderTaskMutationFn = Apollo.MutationFunction<StartRenderTaskMutation, StartRenderTaskMutationVariables>;

/**
 * __useStartRenderTaskMutation__
 *
 * To run a mutation, you first call `useStartRenderTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartRenderTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startRenderTaskMutation, { data, loading, error }] = useStartRenderTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStartRenderTaskMutation(baseOptions?: Apollo.MutationHookOptions<StartRenderTaskMutation, StartRenderTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartRenderTaskMutation, StartRenderTaskMutationVariables>(StartRenderTaskDocument, options);
      }
export type StartRenderTaskMutationHookResult = ReturnType<typeof useStartRenderTaskMutation>;
export type StartRenderTaskMutationResult = Apollo.MutationResult<StartRenderTaskMutation>;
export type StartRenderTaskMutationOptions = Apollo.BaseMutationOptions<StartRenderTaskMutation, StartRenderTaskMutationVariables>;
export const GetRenderTaskDocument = gql`
    query GetRenderTask($taskId: String!) {
  getRenderTask(taskId: $taskId) {
    id
    status
    payloadUrl
    errorMessage
  }
}
    `;

/**
 * __useGetRenderTaskQuery__
 *
 * To run a query within a React component, call `useGetRenderTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRenderTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRenderTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetRenderTaskQuery(baseOptions: Apollo.QueryHookOptions<GetRenderTaskQuery, GetRenderTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRenderTaskQuery, GetRenderTaskQueryVariables>(GetRenderTaskDocument, options);
      }
export function useGetRenderTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRenderTaskQuery, GetRenderTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRenderTaskQuery, GetRenderTaskQueryVariables>(GetRenderTaskDocument, options);
        }
export type GetRenderTaskQueryHookResult = ReturnType<typeof useGetRenderTaskQuery>;
export type GetRenderTaskLazyQueryHookResult = ReturnType<typeof useGetRenderTaskLazyQuery>;
export type GetRenderTaskQueryResult = Apollo.QueryResult<GetRenderTaskQuery, GetRenderTaskQueryVariables>;