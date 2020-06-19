import { ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import { useMemo } from "react";
import { InMemoryCache } from "apollo-boost"; // change to 'apollo-link-http'?

import { GQL_API_URL } from "../config";

let apolloClient;

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: GQL_API_URL,
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache(),
  });
