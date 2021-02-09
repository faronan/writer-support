import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Word = {
  __typename?: 'Word';
  wordId: Scalars['ID'];
  wordText: Scalars['String'];
  userId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  proofreadingDataList: Array<ProofreadingData>;
  ngWords: Array<Word>;
  templateWords: Array<Word>;
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
  findUser: User;
};

export type QueryFindUserArgs = {
  userArgs: FindUserArgs;
};

export type FindUserArgs = {
  userEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProofreading: ProofreadingData;
  createUser: User;
  createNgWord: Word;
  createTemplateWord: Word;
  deleteNgWord: Word;
  deleteTemplateWord: Word;
};

export type MutationCreateProofreadingArgs = {
  proofreading: AddProofreadingDataInput;
};

export type MutationCreateUserArgs = {
  userInput: AddUserInput;
};

export type MutationCreateNgWordArgs = {
  wordInput: AddUserWordInput;
};

export type MutationCreateTemplateWordArgs = {
  wordInput: AddUserWordInput;
};

export type MutationDeleteNgWordArgs = {
  wordInput: AddUserWordInput;
};

export type MutationDeleteTemplateWordArgs = {
  wordInput: AddUserWordInput;
};

export type AddProofreadingDataInput = {
  text: Scalars['String'];
  userEmail: Scalars['String'];
  ruleNames: Array<Scalars['String']>;
};

export type AddUserInput = {
  userEmail: Scalars['String'];
  userName: Scalars['String'];
};

export type AddUserWordInput = {
  userEmail: Scalars['String'];
  wordText: Scalars['String'];
};

export type CreateNgWordMutationVariables = Exact<{
  wordInput: AddUserWordInput;
}>;

export type CreateNgWordMutation = { __typename?: 'Mutation' } & {
  createNgWord: { __typename?: 'Word' } & Pick<Word, 'wordText'>;
};

export type CreateProofreadingMutationVariables = Exact<{
  proofreading: AddProofreadingDataInput;
}>;

export type CreateProofreadingMutation = { __typename?: 'Mutation' } & {
  createProofreading: { __typename?: 'ProofreadingData' } & Pick<
    ProofreadingData,
    'text'
  > & {
      result?: Maybe<
        Array<
          { __typename?: 'LintResult' } & Pick<
            LintResult,
            'ruleName' | 'message' | 'line' | 'column'
          >
        >
      >;
    };
};

export type CreateTemplateWordMutationVariables = Exact<{
  wordInput: AddUserWordInput;
}>;

export type CreateTemplateWordMutation = { __typename?: 'Mutation' } & {
  createTemplateWord: { __typename?: 'Word' } & Pick<Word, 'wordText'>;
};

export type CreateUserMutationVariables = Exact<{
  userInput: AddUserInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & Pick<User, 'name' | 'email'>;
};

export type DeleteNgWordMutationVariables = Exact<{
  wordInput: AddUserWordInput;
}>;

export type DeleteNgWordMutation = { __typename?: 'Mutation' } & {
  deleteNgWord: { __typename?: 'Word' } & Pick<Word, 'wordText'>;
};

export type DeleteTemplateWordMutationVariables = Exact<{
  wordInput: AddUserWordInput;
}>;

export type DeleteTemplateWordMutation = { __typename?: 'Mutation' } & {
  deleteTemplateWord: { __typename?: 'Word' } & Pick<Word, 'wordText'>;
};

export type FindUserQueryVariables = Exact<{
  userArgs: FindUserArgs;
}>;

export type FindUserQuery = { __typename?: 'Query' } & {
  findUser: { __typename?: 'User' } & {
    ngWords: Array<{ __typename?: 'Word' } & Pick<Word, 'wordText'>>;
    templateWords: Array<{ __typename?: 'Word' } & Pick<Word, 'wordText'>>;
  };
};

export type ProofreadingDataListQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ProofreadingDataListQuery = { __typename?: 'Query' } & {
  proofreadingDataList: Array<
    { __typename?: 'ProofreadingData' } & Pick<
      ProofreadingData,
      'text' | 'createdAt'
    > & {
        user?: Maybe<{ __typename?: 'User' } & Pick<User, 'name'>>;
        result?: Maybe<
          Array<
            { __typename?: 'LintResult' } & Pick<
              LintResult,
              'ruleName' | 'message' | 'line' | 'column'
            >
          >
        >;
      }
  >;
};

export const CreateNgWordDocument: DocumentNode<
  CreateNgWordMutation,
  CreateNgWordMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createNgWord' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'wordInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddUserWordInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createNgWord' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'wordInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'wordInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'wordText' } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const CreateProofreadingDocument: DocumentNode<
  CreateProofreadingMutation,
  CreateProofreadingMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createProofreading' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'proofreading' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddProofreadingDataInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProofreading' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'proofreading' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'proofreading' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'result' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ruleName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'line' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'column' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const CreateTemplateWordDocument: DocumentNode<
  CreateTemplateWordMutation,
  CreateTemplateWordMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createTemplateWord' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'wordInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddUserWordInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createTemplateWord' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'wordInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'wordInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'wordText' } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const CreateUserDocument: DocumentNode<
  CreateUserMutation,
  CreateUserMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const DeleteNgWordDocument: DocumentNode<
  DeleteNgWordMutation,
  DeleteNgWordMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteNgWord' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'wordInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddUserWordInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteNgWord' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'wordInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'wordInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'wordText' } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const DeleteTemplateWordDocument: DocumentNode<
  DeleteTemplateWordMutation,
  DeleteTemplateWordMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteTemplateWord' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'wordInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AddUserWordInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteTemplateWord' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'wordInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'wordInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'wordText' } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const FindUserDocument: DocumentNode<
  FindUserQuery,
  FindUserQueryVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userArgs' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'FindUserArgs' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'findUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userArgs' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userArgs' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ngWords' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'wordText' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'templateWords' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'wordText' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const ProofreadingDataListDocument: DocumentNode<
  ProofreadingDataListQuery,
  ProofreadingDataListQueryVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'proofreadingDataList' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'proofreadingDataList' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'result' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ruleName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'line' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'column' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
};
