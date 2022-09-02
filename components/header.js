import React from "react";
import {
  Heading,
  Flex,
  Link,
  Button
} from "@chakra-ui/react";
import { useLRAuth } from "loginradius-react"
import { useRouter } from 'next/router';

const Header = () => {
  // const { isAuthenticated, user, logout } = useLRAuth()
  const router = useRouter();
//   function logout() {
//     localStorage.removeItem('user');
//     Router.push('/login');
// }
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Next JS CRUD
        </Heading>
      </Flex>
      <Flex align="right" mr={5}>
        <Heading as="h6" size="lg" letterSpacing={"tighter"}>
        {isAuthenticated && user && (
          <Button onClick={() => '/'}>Log out</Button>
        )}
         {/* <Link href="">Logout</Link> */}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Header;