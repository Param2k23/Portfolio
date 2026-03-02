import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Flex,
  Badge,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import ProfileArray from "./ProfileArray";

export default function Header({ color }) {
  const profile = ProfileArray();
  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    contactSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    projectsSection.scrollIntoView({ behavior: "smooth" });
  };
  const linkedin = () => {
    window.open(
                `${profile.linkedin}`,
                "_blank",
                "noreferrer,noopener"
              );
  };
  return (
    <>
      <Heading>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Heading>

      <Container maxW={"6xl"} id="hero">
        <Stack spacing={{ base: 10, md: 14 }} pb={{ base: 20, md: 32 }} pt={{ base: 28, md: 44 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "center", lg: "stretch" }}
            gap={{ base: 10, lg: 12 }}
          >
            <Stack
              spacing={{ base: 6, md: 8 }}
              textAlign={{ base: "center", lg: "left" }}
              flex={1}
              position="relative"
              zIndex={1}
            >
              <Badge
                colorScheme={color}
                variant="subtle"
                alignSelf={{ base: "center", lg: "flex-start" }}
                textTransform="uppercase"
                letterSpacing="0.2em"
              >
                Generative AI Engineer
              </Badge>
              <Heading
                fontWeight={700}
                fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                {profile.headerName}
                <br />
                <Text as={"span"} color={`${color}.400`}>
                  {profile.headerRole}
                </Text>
              </Heading>
              <Text
                color={"gray.600"}
                fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                maxW={{ base: "100%", lg: "90%" }}
              >
                {profile.headerDesc}
              </Text>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={4}
                align={{ base: "center", lg: "flex-start" }}
                position={"relative"}
              >
                <Button
                  colorScheme={color}
                  bg={`${color}.400`}
                  rounded={"full"}
                  px={7}
                  size="lg"
                  _hover={{
                    bg: `${color}.500`,
                  }}
                  onClick={linkedin}
                >
                  Let's connect
                </Button>
                <Button
                  variant="outline"
                  borderColor="blackAlpha.200"
                  color="gray.800"
                  rounded={"full"}
                  size="lg"
                  onClick={scrollToProjects}
                  _hover={{ borderColor: "blackAlpha.400" }}
                >
                  See projects
                </Button>
                <Box display={{ base: "none", md: "block" }} position="relative" ml={4}>
                  <Button
                    variant={"link"}
                    colorScheme={"blue"}
                    size={"sm"}
                    onClick={scrollToContact}
                  >
                    Contact me
                  </Button>
                </Box>
              </Stack>
            </Stack>

            <Stack
              flex={1}
              spacing={4}
              bg={useColorModeValue("whiteAlpha.800", "rgba(30, 30, 50, 0.8)")}
              border="1px solid"
              borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
              borderRadius="24px"
              p={{ base: 6, md: 8 }}
              className="float-slow"
              minH={{ base: "auto", lg: "360px" }}
            >
              <Heading fontSize={{ base: "xl", md: "2xl" }} textAlign="left">
                Impact snapshot
              </Heading>
              <Text textAlign="left" color="gray.600">
                Builder of multi-agent automation and RAG systems with proven impact across enterprise workflows.
              </Text>
              <Divider borderColor="blackAlpha.200" />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                {[
                  { title: "75%", label: "incident triage time reduced" },
                  { title: "31%", label: "task completion boost" },
                  { title: "99%", label: "production uptime" },
                  { title: "40M+", label: "tweets analyzed" },
                ].map((item) => (
                  <Box
                    key={item.title}
                    bg="white"
                    borderRadius="16px"
                    border="1px solid"
                    borderColor="blackAlpha.100"
                    p={4}
                    textAlign="left"
                  >
                    <Text fontSize="2xl" fontWeight={700} color={`${color}.500`}>
                      {item.title}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {item.label}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}
