import { ApolloProvider } from '@apollo/client';
import { client } from '@graphql/client';
import { Provider } from 'next-auth/client';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider session={pageProps.session}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
