import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/auth/LoginScreen'
import HomeScreen from './src/screens/home/HomeScreen';
import ExploreScreen from './src/screens/explore/IndexScreen';
import CourseShowScreen from './src/screens/course/ShowScreen';
import TopicIndexScreen from './src/screens/topic/IndexScreen';

import { ApolloProvider } from '@apollo/client';
import { client } from './src/conf/apollo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Explore" component={ExploreScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Course.Show" component={CourseShowScreen} />
              <Stack.Screen name="Topic.Index" component={TopicIndexScreen} />

              {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}