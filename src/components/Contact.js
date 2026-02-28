import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Heading,
  Center,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import ProfileArray from "./ProfileArray";

export default function Contact({ color }) {
  const profile = ProfileArray();
  const linkedin = () => {
    window.open(`${profile.linkedin}`, "_blank", "noreferrer,noopener");
  };
  const github = () => {
    window.open(`${profile.github}`, "_blank", "noreferrer,noopener");
  };
  const email = () => {
    window.open(`mailto:${profile.email}`, "_blank", "noreferrer,noopener");
  };
  return (
    <>
      <Container maxW={"6xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
          align="center"
        >
          <Stack align="center" direction="row" p={4} justify="center">
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                05
              </Text>
              <Text fontWeight={800}>Contact</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack
            spacing={4}
            as={Container}
            maxW={"3xl"}
            textAlign={"center"}
            bg={useColorModeValue("whiteAlpha.800", "rgba(30, 30, 50, 0.8)")}
            border="1px solid"
            borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            borderRadius="24px"
            p={{ base: 6, md: 10 }}
            align="center"
          >
            <Heading fontSize={"3xl"}>Let's build something bold.</Heading>
            <Text color={"gray.600"} fontSize={"xl"} px={4}>
              {profile.contact}
            </Text>
            <Text color={`${color}.400`} fontWeight={600} fontSize={"lg"} px={4}>
              {profile.email}
            </Text>
            <Center>
              <HStack pt={4} spacing={4}>
                <Button onClick={linkedin} colorScheme={color} variant="outline">
                  LinkedIn
                </Button>
                <Button onClick={github} colorScheme={color} variant="outline">
                  GitHub
                </Button>
                <Button onClick={email} colorScheme={color} variant="solid">
                  Email me
                </Button>
              </HStack>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

