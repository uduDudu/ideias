import { GraphQLClient } from "graphql-hooks";
import memCache from "graphql-hooks-memcache";
import unfetch from "isomorphic-unfetch";
import { parseCookies } from "nookies";

import { GQL_API_URL } from "../config";

let graphQLClient = null;

const create = (initialState = {}) => {
  const headers = {
    "X-Hasura-User-Id": parseCookies()["X-Hasura-User-Id"],
  };
  const token = parseCookies()["token"];
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new GraphQLClient({
    ssrMode: typeof window === "undefined",
    url: `${GQL_API_URL}/v1/graphql`,
    cache: memCache({ initialState }),
    fetch: typeof window !== "undefined" ? fetch.bind() : unfetch, // eslint-disable-line
    headers,
  });
};

const initGraphQL = (initialState) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return create(initialState);
  }
  // Reuse client on the client-side
  if (!graphQLClient) {
    graphQLClient = create(initialState);
  }

  return graphQLClient;
};

export default initGraphQL;
