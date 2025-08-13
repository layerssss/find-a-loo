/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

export type DataProvider = {
  __typename?: 'DataProvider';
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Loo = {
  __typename?: 'Loo';
  changingRoom: Scalars['Boolean']['output'];
  dataProvider?: Maybe<DataProvider>;
  distanceMeters?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  lonlat: Point;
  lonlatDescription?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  toilet: Scalars['Boolean']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};


export type LooDistanceMetersArgs = {
  origin: PointInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** An example field added by the generator */
  testField: Scalars['String']['output'];
};

/** A geographical point represented by latitude and longitude */
export type Point = {
  __typename?: 'Point';
  /** Latitude of the point */
  lat: Scalars['Float']['output'];
  /** Longitude of the point */
  lon: Scalars['Float']['output'];
};

/** A geographical point represented by latitude and longitude */
export type PointInput = {
  /** Latitude of the point */
  lat: Scalars['Float']['input'];
  /** Longitude of the point */
  lon: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  loo?: Maybe<Loo>;
  loos: Array<Loo>;
};


export type QueryLooArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLoosArgs = {
  distanceMeters: Scalars['Int']['input'];
  origin: PointInput;
};

export type HomeScreenQueryVariables = Exact<{
  origin: PointInput;
  distanceMeters: Scalars['Int']['input'];
}>;


export type HomeScreenQuery = { __typename?: 'Query', loos: Array<{ __typename?: 'Loo', id: string, name: string, lonlatDescription?: string | null, distanceMeters?: number | null, dataProvider?: { __typename?: 'DataProvider', id: string, name: string } | null }> };

export type MapScreenQueryQueryVariables = Exact<{
  origin: PointInput;
  distanceMeters: Scalars['Int']['input'];
}>;


export type MapScreenQueryQuery = { __typename?: 'Query', loos: Array<{ __typename?: 'Loo', id: string, name: string, lonlat: { __typename?: 'Point', lon: number, lat: number } }> };

export type LooScreenQueryQueryVariables = Exact<{
  looId: Scalars['ID']['input'];
}>;


export type LooScreenQueryQuery = { __typename?: 'Query', loo?: { __typename?: 'Loo', id: string, name: string } | null };


export const HomeScreenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"origin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"distanceMeters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"origin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"origin"}}},{"kind":"Argument","name":{"kind":"Name","value":"distanceMeters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"distanceMeters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lonlatDescription"}},{"kind":"Field","name":{"kind":"Name","value":"distanceMeters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"origin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"origin"}}}]},{"kind":"Field","name":{"kind":"Name","value":"dataProvider"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<HomeScreenQuery, HomeScreenQueryVariables>;
export const MapScreenQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MapScreenQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"origin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PointInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"distanceMeters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"origin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"origin"}}},{"kind":"Argument","name":{"kind":"Name","value":"distanceMeters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"distanceMeters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lonlat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lon"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}}]}}]}}]}}]} as unknown as DocumentNode<MapScreenQueryQuery, MapScreenQueryQueryVariables>;
export const LooScreenQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LooScreenQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"looId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"looId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LooScreenQueryQuery, LooScreenQueryQueryVariables>;