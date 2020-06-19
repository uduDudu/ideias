import { useState } from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/core";
import Link from "next/link";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="rgb(15,111,245)"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Image size="60px" src="images/ipt-logo.png" alt="Ideias Pra Todos" />
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>
          <Link href="/">Home</Link>
        </MenuItems>
        <MenuItems>Ideias</MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Link href="/login">
          <Button bg="transparent" border="1px">
            Login
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
