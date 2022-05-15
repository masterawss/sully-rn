import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../src/screens/auth/LoginScreen'
import HomeScreen from '../../src/screens/home/HomeScreen';
import ExploreScreen from '../../src/screens/explore/IndexScreen';
import CourseShowScreen from '../../src/screens/course/ShowScreen';
import TopicIndexScreen from '../../src/screens/topic/IndexScreen';
import { useContext } from 'react';
import { AuthContext } from '../store/auth/authProvider';


const Stack = createNativeStackNavigator();

export const AuthRoutes = () => {

  const { signIn } = useContext(AuthContext);

  return (
    <>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Course.Show" component={CourseShowScreen} />
        <Stack.Screen name="Topic.Index" component={TopicIndexScreen} />
      </Stack.Navigator>
    </>
  )
}