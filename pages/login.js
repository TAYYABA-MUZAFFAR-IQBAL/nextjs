import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import login from '../services/userAuth'
import { FaUserAlt, FaLock } from "react-icons/fa";
import api from "../services/api";
import { redirect } from "next/dist/server/api-utils";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidFormData = () => {
    if (!email) {
      return toast({
        title: "Fill in the email field!!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (!password) {
      return toast({
        title: "Fill in the password field!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmitLoginClient = async (e) => {
    e.preventDefault();
    if (isValidFormData()) return;
    //     try {
    setIsLoading(true);
    setEmail("");
    setPassword("");
  
    const data = await api.post("/clients/auth", { email, password });
    router.push('/');
    // //     //   setClients(clients.concat(data.data));
    // console.log(data);
    // toast({
    //   title: "Login successfully!",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    // });
    // setIsLoading(false);
    // redirect("/");
    //   return [
    //     {
    //       source: '/login',
    //       destination: '/',
    //       permanent: true,
    //     },
    //   ]

    //       if(data)
    //     {  toast({
    //         title: "Login Success!",
    //         status: "success",
    //         duration: 9000,
    //         isClosable: true,
    //       });
    //       setIsLoading(false);}
    //     } catch (error) {
    //       console.log(error);
    //       setIsLoading(false);
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    // children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    //   onChange={(e) => setEmail(e.target.value)}
                    //   value={email}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    //   onChange={(e) => setPassword(e.target.value)}
                    //   value={password}
                    //   // children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText> */}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={ () => handleSubmitLoginClient()}
              >
                {/* <Link href="/">  Login</Link> */}
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="/signup">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
