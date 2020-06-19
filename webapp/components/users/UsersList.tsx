import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Button, Heading, Box } from "@chakra-ui/core";

export const USERS_QUERY = gql`
  {
    user {
      id
      display_name
    }
  }
`;

const UsersList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(USERS_QUERY);

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
    <Box p={8} bg="gray.50" rounded="md">
      <Heading>Usuários Cadastrados</Heading>
      {users}
      <Button mt="4" onClick={() => refetch()}>
        Atualizar
      </Button>
    </Box>
  );
};

export default UsersList;
