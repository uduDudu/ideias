import React, { useState } from "react";
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/core";
import { parseCookies } from "nookies";
import { useMutation } from "graphql-hooks";
import { withRouter } from "next/router";

import { BRAND_PRIMARY } from "../_commons/colors";

export const insertProductMutation = `
  mutation ($name: String!, $description: String!, $maker_id: uuid!) {
    insert_product(objects: {description: $description, name: $name, maker_id: $maker_id}) {
      returning {
        id
        name
      }
    }
  }
`;

const NewProductForm = ({ router }) => {
  const [insertProduct] = useMutation(insertProductMutation);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const maker_id = parseCookies()["X-Hasura-User-Id"];
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await insertProduct({
      variables: {
        name,
        description,
        maker_id,
      },
    });

    if (response.error) {
      console.info(response);
      setError(JSON.stringify(response.error));
    } else {
      setName("");
      setDescription("");
      router.push("/products");
    }
  };

  const errorsNode = () => {
    if (!error) return false;
    return (
      <Alert status="error" mb={8} rounded="md" variant="left-accent">
        <AlertIcon />
        {error}
      </Alert>
    );
  };

  return (
    <Box w="100%" minH="100vh" p={4} d="flex" alignItems="center" justifyContent="center">
      <Box w="500px" p={8} bg="gray.50" rounded="md">
        {errorsNode()}
        <FormControl mb={8}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            aria-describedby="phone"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={8}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            type="text"
            id="description"
            aria-describedby="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button bg={BRAND_PRIMARY} color="white" onClick={handleSubmit}>
            Save
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default withRouter(NewProductForm);
