import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: Date;
};
export declare type AuthPayload = {
    __typename?: 'AuthPayload';
    token: Scalars['String'];
    user: User;
};
export declare type Feed = {
    __typename?: 'Feed';
    count: Scalars['Int'];
    id?: Maybe<Scalars['ID']>;
    links: Array<Link>;
};
export declare type Link = {
    __typename?: 'Link';
    createdAt: Scalars['DateTime'];
    description: Scalars['String'];
    id: Scalars['Int'];
    postedBy?: Maybe<User>;
    url: Scalars['String'];
    voters: Array<User>;
};
export declare type LinkOrderByInput = {
    createdAt?: InputMaybe<Sort>;
    description?: InputMaybe<Sort>;
    url?: InputMaybe<Sort>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    deletePost: Scalars['Boolean'];
    login: AuthPayload;
    post: Link;
    signup: AuthPayload;
    startRenderTask: RenderTask;
    updatePost?: Maybe<Link>;
    vote?: Maybe<Vote>;
};
export declare type MutationDeletePostArgs = {
    id: Scalars['Int'];
};
export declare type MutationLoginArgs = {
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationPostArgs = {
    description: Scalars['String'];
    url: Scalars['String'];
};
export declare type MutationSignupArgs = {
    email: Scalars['String'];
    name: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationStartRenderTaskArgs = {
    input: RenderTaskInput;
};
export declare type MutationUpdatePostArgs = {
    description: Scalars['String'];
    id: Scalars['Int'];
    url: Scalars['String'];
};
export declare type MutationVoteArgs = {
    linkId: Scalars['Int'];
};
export declare type Query = {
    __typename?: 'Query';
    feed: Feed;
    getRenderTask: RenderTask;
};
export declare type QueryFeedArgs = {
    filter?: InputMaybe<Scalars['String']>;
    orderBy?: InputMaybe<Array<LinkOrderByInput>>;
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
};
export declare type QueryGetRenderTaskArgs = {
    taskId: Scalars['String'];
};
export declare type RenderTask = {
    __typename?: 'RenderTask';
    errorMessage?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    payloadUrl?: Maybe<Scalars['String']>;
    status: RenderTaskStatus;
};
export declare type RenderTaskInput = {
    prompt: Scalars['String'];
};
export declare enum RenderTaskStatus {
    Completed = "Completed",
    Created = "Created",
    Failed = "Failed",
    Processing = "Processing"
}
export declare enum Sort {
    Asc = "asc",
    Desc = "desc"
}
export declare type User = {
    __typename?: 'User';
    Votes: Array<Link>;
    email: Scalars['String'];
    id: Scalars['Int'];
    links: Array<Link>;
    name: Scalars['String'];
    password: Scalars['String'];
};
export declare type Vote = {
    __typename?: 'Vote';
    link: Link;
    user: User;
};
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
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
export declare type ResolversParentTypes = {
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
export declare type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
    token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}
export declare type FeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = {
    count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type LinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    postedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    voters?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
    login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
    post?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationPostArgs, 'description' | 'url'>>;
    signup?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'name' | 'password'>>;
    startRenderTask?: Resolver<ResolversTypes['RenderTask'], ParentType, ContextType, RequireFields<MutationStartRenderTaskArgs, 'input'>>;
    updatePost?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'description' | 'id' | 'url'>>;
    vote?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<MutationVoteArgs, 'linkId'>>;
};
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    feed?: Resolver<ResolversTypes['Feed'], ParentType, ContextType, Partial<QueryFeedArgs>>;
    getRenderTask?: Resolver<ResolversTypes['RenderTask'], ParentType, ContextType, RequireFields<QueryGetRenderTaskArgs, 'taskId'>>;
};
export declare type RenderTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['RenderTask'] = ResolversParentTypes['RenderTask']> = {
    errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    payloadUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['RenderTaskStatus'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
    Votes?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type VoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = {
    link?: Resolver<ResolversTypes['Link'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type Resolvers<ContextType = any> = {
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
export declare type StartRenderTaskMutationVariables = Exact<{
    input: RenderTaskInput;
}>;
export declare type StartRenderTaskMutation = {
    __typename?: 'Mutation';
    startRenderTask: {
        __typename?: 'RenderTask';
        id: string;
        status: RenderTaskStatus;
    };
};
export declare type GetRenderTaskQueryVariables = Exact<{
    taskId: Scalars['String'];
}>;
export declare type GetRenderTaskQuery = {
    __typename?: 'Query';
    getRenderTask: {
        __typename?: 'RenderTask';
        id: string;
        status: RenderTaskStatus;
        payloadUrl?: string | null;
        errorMessage?: string | null;
    };
};
export declare const StartRenderTaskDocument: Apollo.DocumentNode;
export declare type StartRenderTaskMutationFn = Apollo.MutationFunction<StartRenderTaskMutation, StartRenderTaskMutationVariables>;
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
export declare function useStartRenderTaskMutation(baseOptions?: Apollo.MutationHookOptions<StartRenderTaskMutation, StartRenderTaskMutationVariables>): Apollo.MutationTuple<StartRenderTaskMutation, Exact<{
    input: RenderTaskInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type StartRenderTaskMutationHookResult = ReturnType<typeof useStartRenderTaskMutation>;
export declare type StartRenderTaskMutationResult = Apollo.MutationResult<StartRenderTaskMutation>;
export declare type StartRenderTaskMutationOptions = Apollo.BaseMutationOptions<StartRenderTaskMutation, StartRenderTaskMutationVariables>;
export declare const GetRenderTaskDocument: Apollo.DocumentNode;
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
export declare function useGetRenderTaskQuery(baseOptions: Apollo.QueryHookOptions<GetRenderTaskQuery, GetRenderTaskQueryVariables>): Apollo.QueryResult<GetRenderTaskQuery, Exact<{
    taskId: string;
}>>;
export declare function useGetRenderTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRenderTaskQuery, GetRenderTaskQueryVariables>): Apollo.LazyQueryResultTuple<GetRenderTaskQuery, Exact<{
    taskId: string;
}>>;
export declare type GetRenderTaskQueryHookResult = ReturnType<typeof useGetRenderTaskQuery>;
export declare type GetRenderTaskLazyQueryHookResult = ReturnType<typeof useGetRenderTaskLazyQuery>;
export declare type GetRenderTaskQueryResult = Apollo.QueryResult<GetRenderTaskQuery, GetRenderTaskQueryVariables>;
