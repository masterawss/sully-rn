import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { ApolloProvider } from '@apollo/client';
import { client } from './src/conf/apollo';
import { useState } from 'react';
import { AuthProvider } from './src/store/auth/authProvider';
import { AuthRoutes } from './src/layout/authRoutes';


export default function App() {

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <NavigationContainer>
              <AuthRoutes/>
            </NavigationContainer>
          </AuthProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}