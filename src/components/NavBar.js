import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
  useColorMode,
  Stack,
  IconButton,
  useMediaQuery,
  useDisclosure,
  HStack,
  Link,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import ProfileArray from "./ProfileArray";
const TbIcons = require("react-icons/tb");

export default function Nav({ color }) {
  const profile = ProfileArray();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  
  const navbarBg = useColorModeValue("rgba(248, 244, 238, 0.95)", "rgba(15, 15, 30, 0.95)");
  const navbarShadow = useColorModeValue("0 10px 30px rgba(0,0,0,0.15)", "0 10px 30px rgba(0,0,0,0.5)");
  const colors = {
  "blue": "#3182CE", 
  "cyan": "#00B5D8", 
  "gray": "#718096", 
  "green": "#38A169", 
  "orange": "#DD6B20", 
  "pink": "#D53F8C", 
  "purple": "#805AD5", 
  "red": "#E53E3E", 
  "teal": "#319795", 
  "yellow": "#D69E2E"};
  const [scroll, setScroll] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");
  const scrollToHero = () => {
  const heroSection = document.querySelector("#hero");
    heroSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToExperience = () => {
    const experienceSection = document.querySelector("#experience");
    experienceSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    projectsSection.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    contactSection.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const changeScroll = () =>
      document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
        ? setScroll(true)
        : setScroll(false);

    window.addEventListener("scroll", changeScroll);
    return () => window.removeEventListener("scroll", changeScroll);
  }, []);

  const TbLetterComponents = [];

  for (let i = 0; i < profile.logo.length; i++) {
    const letter = profile.logo[i];
    const component = TbIcons[`TbLetter${letter}`];
    TbLetterComponents.push(component);
  }

  return (
    <>
      <Flex
        bg={scroll ? navbarBg : "transparent"}
        backdropFilter={scroll ? "blur(12px)" : "none"}
        px={{ base: 4, md: 8 }}
        h={16}
        boxShadow={scroll ? navbarShadow : "none"}
        zIndex="sticky"
        position="fixed"
        as="header"
        alignItems={"center"}
        justifyContent={"space-between"}
        w="100%"
      >
        <Link onClick={scrollToHero}>
          <HStack spacing={1}>
            {TbLetterComponents.map((Component, index) => (
              <Component key={index} color={colors[color]} />
            ))}
            <Box
              ml={2}
              fontWeight={700}
              color={useColorModeValue("gray.900", "white")}
            >
              {profile.siteName}
            </Box>
          </HStack>
        </Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {isLargerThanMD ? (
              <>
                <Button variant="ghost" onClick={scrollToAbout}>
                  About
                </Button>
                <Button variant="ghost" onClick={scrollToExperience}>
                  Experience
                </Button>
                <Button variant="ghost" onClick={scrollToProjects}>
                  Projects
                </Button>
                <Button variant="ghost" onClick={scrollToContact}>
                  Contact
                </Button>
                <Tooltip label={isDark ? 'Light Mode' : 'Dark Mode'} placement="bottom" hasArrow>
                  <IconButton
                    icon={isDark ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                    variant="ghost"
                    aria-label="Toggle theme"
                    _hover={{
                      bg: isDark ? 'rgba(255, 122, 74, 0.2)' : 'rgba(47, 135, 255, 0.2)',
                    }}
                  />
                </Tooltip>
                <Button
                  colorScheme={color}
                  bg={`${color}.400`}
                  _hover={{ bg: `${color}.500` }}
                  rounded="full"
                  onClick={() => window.open("/content/Param_Patel_SE.pdf", "_blank")}
                >
                  Resume
                </Button>
              </>
            ) : (
              <></>
            )}
            {isLargerThanMD ? (
              <></>
            ) : (
              <>
                <Tooltip label={isDark ? 'Light Mode' : 'Dark Mode'} placement="bottom" hasArrow>
                  <IconButton
                    icon={isDark ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                    variant="ghost"
                    aria-label="Toggle theme"
                    _hover={{
                      bg: isDark ? 'rgba(255, 122, 74, 0.2)' : 'rgba(47, 135, 255, 0.2)',
                    }}
                  />
                </Tooltip>
                <Button
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  onClick={onOpen}
                ></Button>
                <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerBody>
                      <Button variant="ghost" onClick={scrollToAbout}>
                        About
                      </Button>
                      <Button variant="ghost" onClick={scrollToExperience}>
                        Experience
                      </Button>
                      <Button variant="ghost" onClick={scrollToProjects}>
                        Projects
                      </Button>
                      <Button variant="ghost" onClick={scrollToContact}>
                        Contact
                      </Button>
                      <Button
                        colorScheme={color}
                        bg={`${color}.400`}
                        _hover={{ bg: `${color}.500` }}
                        rounded="full"
                        onClick={() => window.open("/content/Param_Patel_SE.pdf", "_blank")}
                      >
                        Resume
                      </Button>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
