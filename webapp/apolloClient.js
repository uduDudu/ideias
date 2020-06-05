import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";

import { GQL_API_URL } from "./config";

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: new HttpLink({
            uri: `${GQL_API_URL}/v1/graphql`, // Server URL (must be absolute)
            credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
            fetch,
            // headers: {
            //     cookie: ctx.req ? ctx.req.headers.cookie : undefined,
            // },
        }),
        cache: new InMemoryCache().restore(initialState),
        // defaultOptions: {
        //     watchQuery: {
        //         fetchPolicy: "cache-and-network",
        //     },
        //     query: { fetchPolicy: "cache-and-network" },
        // },
    });
}
