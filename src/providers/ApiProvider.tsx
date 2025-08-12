import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://loobase.micy.in/graphql",
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
