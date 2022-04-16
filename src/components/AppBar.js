import React from 'react';
import {
  Text,
  HStack,
  Center,
  Box,
  StatusBar,
  IconButton,
  HamburgerIcon,
  InfoIcon,
  useToast,
  Pressable,
} from 'native-base';

const AppBar = () => {
  const toast = useToast();
  return (
    <Center>
      <StatusBar bg="primary.400" barStyle="light-content" />
      <Box safeAreaTop bg="primary.400" />
      <HStack
        bg="primary.500"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="350">
        <HStack alignItems="center">
          <IconButton
            icon={
              <HamburgerIcon size="sm" color="white" name="menu" />
            }
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack>
          <Center marginRight={'2%'}>
          <Pressable onPress={() => toast.show({
            title: "Choose a lesson you \n want to navigate to",
            placement: "top-right",
            backgroundColor: "primary.600"
            })}>
              <InfoIcon size="sm" color="white" name="info" />
          </Pressable>
          </Center>
        </HStack>
      </HStack>
    </Center>
  );
};

export default AppBar;