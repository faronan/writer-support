import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LintRule = {
  __typename?: 'LintRule';
  ruleId: Scalars['String'];
  isValid: Scalars['Boolean'];
};

export type LintResult = {
  __typename?: 'LintResult';
  resultId: Scalars['Int'];
  message: Scalars['String'];
  line: Scalars['Int'];
  column: Scalars['Int'];
};

export type ProofreadingData = {
  __typename?: 'ProofreadingData';
  dataId: Scalars['Int'];
  text: Scalars['String'];
  rules: LintRule;
  result: LintResult;
};

export type Query = {
  __typename?: 'Query';
  proofreadingDatas: Array<ProofreadingData>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProofreading: ProofreadingData;
};


export type MutationCreateProofreadingArgs = {
  text: Scalars['String'];
};

export type ProofreadingDatasQueryVariables = Exact<{ [key: string]: never; }>;


export type ProofreadingDatasQuery = (
  { __typename?: 'Query' }
  & { proofreadingDatas: Array<(
    { __typename?: 'ProofreadingData' }
    & Pick<ProofreadingData, 'dataId' | 'text'>
  )> }
);


export const ProofreadingDatasDocument: DocumentNode<ProofreadingDatasQuery, ProofreadingDatasQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"proofreadingDatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proofreadingDatas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]};