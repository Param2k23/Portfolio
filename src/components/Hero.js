import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
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
              bg="whiteAlpha.800"
              borderRadius="24px"
              border="1px solid"
              borderColor="blackAlpha.100"
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

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
