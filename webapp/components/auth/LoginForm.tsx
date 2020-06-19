import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { setCookie } from "nookies";

import { AUTH_API_URL } from "../../config";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    console.info("signing response data", data);

    if (response.status !== 200) {
      setError("Something went wrong! Please try again.");
    } else {
      setCookie({}, "X-Hasura-User-Id", data.id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCookie({}, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCookie({}, "X-Hasura-User-Role", data.roles[0], {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
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
    <Box
      w="100%"
      minH="70vh"
      p={4}
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="500px" p={8} bg="gray.50" rounded="md">
        {errorsNode()}
        <FormControl mb={8}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            id="username"
            aria-describedby="john"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mb={8}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            aria-describedby="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button onClick={handleSubmit}>Sign In</Button>
        </FormControl>
        <Box m={8} textAlign="center">
          <Link href="/signup">
            <Button type="button" variantColor="green">
              Signup
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
