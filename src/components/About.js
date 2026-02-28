import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  SimpleGrid,
  Badge,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import ProfileArray from "./ProfileArray";

export default function About({ color }) {
  const profile = ProfileArray();
  const quickFacts = [
    "MS CS at Stony Brook University (GPA 3.67)",
    "B.Tech in Computer Engineering (GPA 9.9/10)",
    "Generative AI + full-stack systems",
  ];
  const skillGroups = [
    {
      title: "Languages",
      items: ["Python", "Java", "C++", "JavaScript", "SQL"],
    },
    {
      title: "Frameworks",
      items: ["React", "Next.js", "Node.js", "FastAPI", "Spring"],
    },
    {
      title: "AI & Data",
      items: ["LLMs", "LangChain", "RAG", "PyTorch", "Vector DBs"],
    },
    {
      title: "Platforms",
      items: ["AWS", "Docker", "PostgreSQL", "MongoDB", "Neo4j"],
    },
  ];
    return (
      <>
        <Container maxW={"6xl"} id="about">
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            pb={{ base: 20, md: 36 }}
          >
            <Stack align="center" direction="row" px={4}>
              <HStack mx={4}>
                <Text color={`${color}.400`} fontWeight={800}>
                  01
                </Text>
                <Text fontWeight={800}>About</Text>
              </HStack>
              <Divider orientation="horizontal" />
            </Stack>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} px={4}>
              <VStack align="start" spacing={6} textAlign="left">
                <Text color={"gray.600"} fontSize={{ base: "lg", md: "xl" }}>
                  {profile.about}
                </Text>
                <VStack align="start" spacing={3}>
                  {quickFacts.map((fact) => (
                    <HStack key={fact} spacing={3}>
                      <Box w={2} h={2} bg={`${color}.400`} borderRadius="full" />
                      <Text color="gray.600">{fact}</Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
              <VStack align="start" spacing={6} textAlign="left">
                {skillGroups.map((group) => (
                  <Box
                    key={group.title}
                    w="100%"
                    bg="whiteAlpha.800"
                    borderRadius="16px"
                    border="1px solid"
                    borderColor="blackAlpha.100"
                    p={4}
                  >
                    <Text fontWeight={600} mb={3}>
                      {group.title}
                    </Text>
                    <HStack spacing={2} flexWrap="wrap">
                      {group.items.map((item) => (
                        <Badge key={item} colorScheme={color} variant="subtle">
                          {item}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </SimpleGrid>
          </Stack>
        </Container>
      </>
    );
}

