import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../src/screens/auth/LoginScreen'
import HomeScreen from '../../src/screens/home/HomeScreen';
import SignUpScreen from '../../src/screens/auth/SignUpScreen';
import ExploreScreen from '../../src/screens/explore/IndexScreen';
import CourseShowScreen from '../../src/screens/course/ShowScreen';
import TopicIndexScreen from '../../src/screens/topic/IndexScreen';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../store/auth/authProvider';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Stack = createNativeStackNavigator();

export const AuthRoutes = () => {

  const { isSignedIn, isLoading } = useContext(AuthContext);

  

  useEffect(() => {
    // console.log('isSignedIn', isSignedIn);
  }, [isSignedIn])

  if (isLoading) {
    return <SplashScreen />;
  }
  
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          isSignedIn ? 
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Explore" component={ExploreScreen} />
            <Stack.Screen name="Course.Show" component={CourseShowScreen} />
            <Stack.Screen name="Topic.Index" component={TopicIndexScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </> :
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        }
      </Stack.Navigator>
    </>
  )
}