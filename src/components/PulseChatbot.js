import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  IconButton,
  Badge,
  Spinner,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon, ChatIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function PulseChatbot({ color }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hey! I'm Pulse. Ask me anything about Param's work, skills, or projects.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const botMessageBg = useColorModeValue("gray.100", "rgba(30, 30, 50, 0.8)");
  const chatboxBg = useColorModeValue("white", "#0f0f1e");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5050/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't connect to the backend. Make sure the server is running on port 5100.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <MotionBox
          position="fixed"
          bottom="24px"
          right="24px"
          zIndex={9999}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          pointerEvents="auto"
        >
          <Button
            colorScheme={color}
            bg={`${color}.400`}
            rounded="full"
            width="16"
            height="16"
            onClick={() => setIsOpen(true)}
            boxShadow="0 10px 30px rgba(0,0,0,0.2)"
            _hover={{ bg: `${color}.500` }}
            cursor="pointer"
          >
            <ChatIcon w={6} h={6} />
          </Button>
        </MotionBox>
      )}

      {isOpen && (
        <MotionBox
          position="fixed"
          bottom="24px"
          right="24px"
          width={{ base: "90vw", sm: "400px" }}
          maxHeight="600px"
          zIndex={9998}
          bg={chatboxBg}
          borderRadius="24px"
          boxShadow="0 20px 50px rgba(0,0,0,0.15)"
          display="flex"
          flexDirection="column"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          pointerEvents="auto"
        >
          {/* Header */}
          <HStack
            bg={`${color}.400`}
            color="white"
            px={6}
            py={4}
            borderTopRadius="24px"
            justifyContent="space-between"
          >
            <VStack align="start" spacing={0}>
              <Text fontWeight={700} fontSize="lg">
                Pulse
              </Text>
              <Badge colorScheme="green" fontSize="xs">
                Online
              </Badge>
            </VStack>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => setIsOpen(false)}
              variant="ghost"
              color="white"
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
            />
          </HStack>

          <Divider m={0} />

          {/* Messages */}
          <VStack
            flex={1}
            overflowY="auto"
            spacing={3}
            p={4}
            align="stretch"
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                maxWidth="85%"
              >
                <Box
                  bg={msg.sender === "user" ? `${color}.400` : botMessageBg}
                  color={msg.sender === "user" ? "white" : "gray.900"}
                  borderRadius="16px"
                  px={4}
                  py={2}
                  wordBreak="break-word"
                  fontSize="sm"
                  lineHeight={1.5}
                >
                  {msg.text}
                </Box>
              </Box>
            ))}
            {isLoading && (
              <HStack spacing={2}>
                <Spinner size="sm" color={`${color}.400`} />
                <Text fontSize="sm" color={textColor}>
                  Pulse is thinking...
                </Text>
              </HStack>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          <Divider m={0} />

          {/* Input */}
          <HStack px={4} py={3} spacing={2}>
            <Input
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              size="sm"
              borderRadius="full"
              borderColor="gray.300"
              _focus={{ borderColor: `${color}.400` }}
              isDisabled={isLoading}
            />
            <Button
              colorScheme={color}
              size="sm"
              rounded="full"
              px={4}
              onClick={handleSend}
              isLoading={isLoading}
              isDisabled={!inputValue.trim() || isLoading}
            >
              Send
            </Button>
          </HStack>
        </MotionBox>
      )}
    </>
  );
}
