import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Button,
  Card,
  CardBody,
  Image,
  Heading,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ProjectsArray from "./ProjectsArray";

export default function Projects({ color }) {
  const projects = ProjectsArray();
    
  return (
    <>
      <Container maxW={"6xl"} id="projects">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                04
              </Text>
              <Text fontWeight={800}>Projects</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} px={4}>
            {projects.map((project) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  overflow="hidden"
                  bg="whiteAlpha.800"
                  border="1px solid"
                  borderColor="blackAlpha.100"
                  h="100%"
                >
                  <Image objectFit="cover" src={project.image} h="200px" />

                  <Stack>
                    <CardBody align="left">
                      <HStack justifyContent="space-between" mb={2}>
                        <Heading size="md">{project.name}</Heading>
                        <Badge colorScheme={color} variant="subtle">
                          Featured
                        </Badge>
                      </HStack>
                      <Text py={2} color="gray.600">
                        {project.description}
                      </Text>
                      <HStack py={2} flexWrap="wrap">
                        {project.buttons.map((button) => (
                          <a key={button.text} href={button.href}>
                            <Button color={`${color}.400`} variant="outline">
                              {button.text}
                            </Button>
                          </a>
                        ))}
                      </HStack>
                      <HStack pt={4} spacing={2} flexWrap="wrap">
                        {project.badges.map((badge) => (
                          <Badge
                            key={badge.text}
                            colorScheme={badge.colorScheme}
                          >
                            {badge.text}
                          </Badge>
                        ))}
                      </HStack>
                    </CardBody>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
          {/* Other Projects section removed */}
        </Stack>
      </Container>
    </>
  );
}
