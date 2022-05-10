import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, Image } from "native-base";
import { useEffect, useState } from "react";
import Ripple from 'react-native-material-ripple'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

const SocialForm = () => {
  const [accessToken, setAccessToken] = useState()
  const [userInfo, setUserInfo] = useState()

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "52991094425-k56kgaoh6terjk9geonlvvkktbdi82h3.apps.googleusercontent.com",
    expoClientId: "52991094425-14nfqqsh05vcufsc0u6t8m4a1n3hecb6.apps.googleusercontent.com"
  })

  useEffect(() => {
    setTest(response)
    console.log('RESPUESTA DE GOOGLE', response);
    if(response?.type === 'success'){
      setAccessToken(response.authentication.accessToken)
      getUserData()
    }
  }, [response]);

  async function getUserData(){
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    userInfoResponse.json().then(data => {
      setUserInfo(data)
    })
  }

  function showUserInfo(){
    if(userInfo){
       
    }
  }

  const [test, setTest] = useState('asd')

  const handleLoginGoogle = () => {
    setTest('CLicked')
    promptAsync({showInRevents: true})
  }

    return (
        <VStack space={3} mt="0">
          <Text>{JSON.stringify(userInfo)}</Text>
            {/* <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChangeText={(val) => setEmail(val)}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input type="password" value={password} onChangeText={(val) => setPassword(val)}/>
              <Link _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500"
              }} alignSelf="flex-end" mt="1">
                  Forget Password?
              </Link>
            </FormControl> 

            <Ripple>
              <Button p={2.5} colorScheme="indigo" onPress={handleLogin} >
                Ingresar
              </Button>
            </Ripple> */}
            <Ripple>
              <Button p={2.5} colorScheme="blue">
                Ingresar con facebook
              </Button>
            </Ripple>
            <Ripple onPress={handleLoginGoogle} >
              <Button p={2.5} colorScheme="red" >
                Ingresar con google
              </Button>
            </Ripple>
            {/* <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                I'm a new user.{" "}
              </Text>
              <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="#">
                Sign Up
              </Link>
            </HStack> */}
          </VStack>
      )
  };

  export default SocialForm;