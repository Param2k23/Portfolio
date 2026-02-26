import {
  Box,
  Container,
  Divider,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Badge,
  Heading,
} from "@chakra-ui/react";

export default function Highlights({ color }) {
  const cards = [
    {
      title: "Multi-agent automation",
      tags: ["Splunk", "Dynatrace", "GitHub", "Outlook"],
      text: "Orchestrated self-healing IT workflows with LLM-guided supervision and automated remediation pipelines.",
    },
    {
      title: "RAG chatbot deployment",
      tags: ["OpenAI", "LangChain", "Next.js"],
      text: "Delivered production Q&A systems with higher task completion and measurable response accuracy gains.",
    },
    {
      title: "NLP research systems",
      tags: ["RoBERTa", "Spark", "Vector DB"],
      text: "Built scalable retrieval and analysis pipelines for biomedical QA and large-scale social sentiment modeling.",
    },
  ];

  return (
    <Container maxW={"6xl"} id="highlights">
      <Stack spacing={{ base: 8, md: 12 }} pb={{ base: 20, md: 32 }}>
        <Stack align="center" direction="row" px={4}>
          <HStack mx={4}>
            <Text color={`${color}.400`} fontWeight={800}>
              02
            </Text>
            <Text fontWeight={800}>Highlights</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} px={4}>
          {cards.map((card) => (
            <Box
              key={card.title}
              bg="whiteAlpha.800"
              borderRadius="20px"
              border="1px solid"
              borderColor="blackAlpha.100"
              p={6}
              textAlign="left"
            >
              <Heading fontSize="lg" mb={3}>
                {card.title}
              </Heading>
              <Text color="gray.600" mb={4}>
                {card.text}
              </Text>
              <HStack spacing={2} flexWrap="wrap">
                {card.tags.map((tag) => (
                  <Badge key={tag} colorScheme={color} variant="subtle">
                    {tag}
                  </Badge>
                ))}
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
