import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import Header from "../components/header";
import api from "../services/api";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);
  const [clients, setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidFormData = () => {
    if (!name) {
      return toast({
        title: "Fill in the name field!!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (!email) {
      return toast({
        title: "Fill in the email field!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (clients.some((client) => client.email === email && client._id !== id)) {
      return toast({
        title: "E-mail already registered!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSubmitCreateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;
    try {
      setIsLoading(true);
      const { data } = await api.post("/clients", { name, email });
      setClients(clients.concat(data.data));
      setName("");
      setEmail("");
      setIsFormOpen(!isFormOpen);
      toast({
        title: "Updated successfully!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Box>
        <Header />
        <Flex align="center" justifyContent="center">
          <Box
            width={800}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            p={20}
            mt="25"
          >
            <Flex justifyContent="flex-end">
              <Flex justifyContent="flex-end">
                <Flex align="center" mr={5}>
                  <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                    Update Client
                  </Heading>
                </Flex>
              </Flex>
              <Button
                colorScheme="green"
                onClick={() => setIsFormOpen(!isFormOpen)}
              >
                {isFormOpen ? "-" : "+"}
              </Button>
            </Flex>

            {isFormOpen ? (
              <VStack
                as="form"
                onSubmit={id ? handleUpdateClient : handleSubmitCreateClient}
              >
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </FormControl>

                <FormControl mt={5}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </FormControl>

                <Button
                  colorScheme="green"
                  type="submit"
                  mt={6}
                  isLoading={isLoading}
                >
                  {id ? "Update" : "register"}
                </Button>
              </VStack>
            ) : null}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Update;
