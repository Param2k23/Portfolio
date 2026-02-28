import React from 'react';
import { useColorMode, Box, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Tooltip 
      label={isDark ? 'Light Mode' : 'Dark Mode'} 
      placement="bottom"
      hasArrow
    >
      <MotionBox
        as="button"
        onClick={toggleColorMode}
        position="fixed"
        top={{ base: '80px', md: '24px' }}
        right={{ base: '20px', md: '24px' }}
        zIndex={999}
        bg={isDark ? 'rgba(255, 122, 74, 0.1)' : 'rgba(47, 135, 255, 0.1)'}
        border="2px solid"
        borderColor={isDark ? 'ff7a4a' : 'brand.400'}
        rounded="full"
        p={3}
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="14"
        height="14"
        transition="all 0.3s ease"
        _hover={{
          bg: isDark ? 'rgba(255, 122, 74, 0.2)' : 'rgba(47, 135, 255, 0.2)',
          transform: 'scale(1.1)',
          boxShadow: isDark 
            ? '0 8px 24px rgba(255, 122, 74, 0.3)' 
            : '0 8px 24px rgba(47, 135, 255, 0.3)',
        }}
        _active={{
          transform: 'scale(0.95)',
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <motion.div
          key={colorMode}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? (
            <SunIcon 
              w={6} 
              h={6} 
              color="brand.400"
            />
          ) : (
            <MoonIcon 
              w={6} 
              h={6} 
              color="brand.400"
            />
          )}
        </motion.div>
      </MotionBox>
    </Tooltip>
  );
}
