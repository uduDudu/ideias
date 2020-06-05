import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { withApollo } from "../libs/apollo";
import { QUERY_ALL_USERS } from "../gql/allUsers";

const IndexPage = () => {
    const { loading, error, data } = useQuery(QUERY_ALL_USERS);
    if (error) return <h1>Error</h1>;
    if (loading) return <h1>Loading...</h1>;

    return (
        <>
            <h1>
                <h3>Usuários</h3>
            </h1>
            <div>
                {data.user.map((data) => (
                    <ul key={data.id}>
                        <li>
                            {data.username} - {data.display_name}
                        </li>
                    </ul>
                ))}
                Usuários Cadastrados: {data.user.length}
            </div>
        </>
    );
};

export default withApollo()(IndexPage);
// export default withNewApollo(IndexPage)();
