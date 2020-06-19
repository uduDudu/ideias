import { ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import { useMemo } from "react";
import { InMemoryCache } from "apollo-boost"; // change to 'apollo-link-http'?
import { parseCookies } from "nookies";

import { GQL_API_URL } from "../config";

let apolloClient;

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

export const initializeApollo = (initialState = null, ctx = null) => {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

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

const createApolloClient = (ctx) => {
  const headers: any = {
    "X-Hasura-User-Id": parseCookies(ctx)["X-Hasura-User-Id"],
  };
  const token = parseCookies(ctx)["token"];
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.info("headers", headers);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: GQL_API_URL,
      headers,
      // credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache(),
  });
};
