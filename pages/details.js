import { useState, useEffect } from "react";
import api from "../services/api";
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
  Heading,
  Td,
  VStack,
  useToast,
} from "@chakra-ui/react";

const Details = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState(null);
    const [clients, setClients] = useState([]);
    const handleDeleteClient = async (_id) => {
        try {
          await api.delete(`/clients/${_id}`);
          toast({
            title: "successfully deleted!",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          console.log(error);
        }
      };
    
      const handlShowUpdateClient = (client) => {
        setId(client._id);
        setName(client.name);
        setEmail(client.email);
        setPassword(client.password);
        setIsFormOpen(true);
      };
    
      const handleUpdateClient = async (e) => {
        e.preventDefault();
    
        if (isValidFormData()) return;
    
        try {
          setIsLoading(true);
          await api.put(`clients/${id}`, { name, email });
          setName("");
          setEmail("");
          setId(null);
          setIsFormOpen(!isFormOpen);
    
          toast({
            title: "Successfully updated!",
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
    
      const toast = useToast();
    
      useEffect(() => {
        [
          api.get("/clients").then(({ data }) => {
            setClients(data.data);
          }),
        ];
      }, [clients]);
  return (
   <>
      <Box
        width={800}
        borderWidth={1}
        borderRadius={8}
        marginLeft={500}
        boxShadow="lg"
        p={20}
        mt="50"
      >
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
          All Data Details
        </Heading>
      </Flex>
    </Flex>
            <Table variant="simple" mt={6}>
            <Thead bgColor="teal.500">
              <Tr>
                <Th textColor="white">Name</Th>
                <Th textColor="white">Email</Th>
                <Th textColor="white">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client, index) => (
                <Tr key={index}>
                  <Td>{client.name}</Td>
                  <Td>{client.email}</Td>
                  <Td justifyContent="space-between">
                    <Flex>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="yellow"
                        mr="2"
                        onClick={() => handlShowUpdateClient(client)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="red"
                        mr="2"
                        onClick={() => handleDeleteClient(client._id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </Box>
   </>
  )
}

export default Details