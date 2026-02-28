import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("whiteAlpha.800", "rgba(30, 30, 50, 0.8)")}
      borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        align="center"
      >
        <Text>© 2026 Param Patel. Crafted with curiosity.</Text>
      </Container>
    </Box>
  );
}
