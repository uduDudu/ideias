import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export const USERS_QUERY = gql`
  {
    user {
      id
      display_name
    }
  }
`;

const UsersList: React.FC = () => {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading Users...</p>;
  if (error) return <p>Error :(</p>;

  const users = data.user.map(({ id, display_name }) => (
    <div key={id}>
      <p>
        {id}: {display_name}
      </p>
    </div>
  ));

  return (
    <>
      <h1>Usuários Cadastrados</h1>
      {users}
    </>
  );
};

export default UsersList;
