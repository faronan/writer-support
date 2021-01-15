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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  proofreadingDataList: Array<ProofreadingData>;
  name: Scalars['String'];
  email: Scalars['String'];
};

export type LintResult = {
  __typename?: 'LintResult';
  resultId: Scalars['ID'];
  proofreadingDataList: Array<ProofreadingData>;
  ruleName: Scalars['String'];
  message: Scalars['String'];
  line: Scalars['Float'];
  column: Scalars['Float'];
};

export type ProofreadingData = {
  __typename?: 'ProofreadingData';
  dataId: Scalars['ID'];
  user?: Maybe<User>;
  result?: Maybe<Array<LintResult>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
};


export type Query = {
  __typename?: 'Query';
  proofreadingDataList: Array<ProofreadingData>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProofreading: ProofreadingData;
};


export type MutationCreateProofreadingArgs = {
  proofreading: AddProofreadingDataInput;
};

export type AddProofreadingDataInput = {
  text: Scalars['String'];
  userEmail: Scalars['String'];
  userName: Scalars['String'];
  ruleNames: Array<Scalars['String']>;
};

export type CreateProofreadingMutationVariables = Exact<{
  proofreading: AddProofreadingDataInput;
}>;


export type CreateProofreadingMutation = (
  { __typename?: 'Mutation' }
  & { createProofreading: (
    { __typename?: 'ProofreadingData' }
    & Pick<ProofreadingData, 'text'>
    & { result?: Maybe<Array<(
      { __typename?: 'LintResult' }
      & Pick<LintResult, 'ruleName' | 'message' | 'line' | 'column'>
    )>> }
  ) }
);

export type ProofreadingDataListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProofreadingDataListQuery = (
  { __typename?: 'Query' }
  & { proofreadingDataList: Array<(
    { __typename?: 'ProofreadingData' }
    & Pick<ProofreadingData, 'text' | 'createdAt'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )>, result?: Maybe<Array<(
      { __typename?: 'LintResult' }
      & Pick<LintResult, 'ruleName' | 'message' | 'line' | 'column'>
    )>> }
  )> }
);


export const CreateProofreadingDocument: DocumentNode<CreateProofreadingMutation, CreateProofreadingMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProofreading"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"proofreading"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddProofreadingDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProofreading"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"proofreading"},"value":{"kind":"Variable","name":{"kind":"Name","value":"proofreading"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ruleName"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"line"}},{"kind":"Field","name":{"kind":"Name","value":"column"}}]}}]}}]}}]};
export const ProofreadingDataListDocument: DocumentNode<ProofreadingDataListQuery, ProofreadingDataListQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"proofreadingDataList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proofreadingDataList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ruleName"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"line"}},{"kind":"Field","name":{"kind":"Name","value":"column"}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]};