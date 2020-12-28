import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  // MEMO: いずれ本番環境のURIに差し替える
  uri: `http://localhost:8888/graphql`,
  cache: new InMemoryCache(),
});
