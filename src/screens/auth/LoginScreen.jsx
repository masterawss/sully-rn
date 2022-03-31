import React from 'react';
import {View, StyleSheet } from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import LoginForm from '../../components/auth/LoginForm';
import image from '../../../assets/bg-login.png';
import { Box, Center, Image, Text, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../assets/logo.png'
import studyingImg from '../../../assets/img/studying.png'

// const image = {uri: 'https://www.fonewalls.com/wp-content/uploads/2020/09/Abstract-Wallpaper-067-300x585.jpg'}

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
        <Center w="100%" h="100%">
          <Box safeArea p="2" my="auto" w="90%" >
            <VStack space={2} alignItems="center">
              <Image alt="adad" source={logo}></Image>
              <Text fontSize="xl" bold>Bienvenido a Sully</Text>
              <Text style={{ textAlign: 'center' }} color="muted.500">
                El mejor lugar para llevar el seguimiento de tus cursos
              </Text>
            </VStack>
            <Image alt="adad" source={studyingImg}></Image>
            <LoginForm></LoginForm>
          </Box>
        </Center>

    </SafeAreaView>
  );
}

export default LoginScreen;