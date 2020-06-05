import gql from "graphql-tag";

export const QUERY_ALL_USERS = gql`
    query allUsers {
        user {
            id
            username
            display_name
        }
    }
`;
