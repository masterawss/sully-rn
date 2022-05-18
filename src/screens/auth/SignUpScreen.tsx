import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'native-base';
import { gql, useMutation } from "@apollo/client"
import { Box, Button, FormControl, HStack, Image, Input, Link } from "native-base"
import { useState } from "react"
import Ripple from 'react-native-material-ripple'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../../components/BackButton';
import { Text } from 'react-native';
import studyingImg from '../../../assets/img/Work_from_home.png'
import logo from '../../../assets/logo.png'

const MUT = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signup(email:$email, password:$password, name:$name){
      user{
        id
        name
      }
      token
    }
  }
`

const SignUpScreen = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordValidate, setPasswordValidate] = useState("")
  const [signup, { loading, error, data }] = useMutation(MUT);
  const navigation = useNavigation();

  const toast = useToast()
  const toastId = "toast"

  const handleSignUp = async () => {

    if(password !== passwordValidate){
      if(!toast.isActive(toastId)){
        toast.show({
          id: toastId,
          render: () => {
            return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                    Las contraseñas no coinciden, inténtelo nuevamente.
                  </Box>;
          }
        })
      }
      return
    }

    const res = await signup({ variables: { email, password} })
    // console.log('RESPUESTA', res.data.signup.token);
    await AsyncStorage.setItem('@token', res.data.signup.token)
    await AsyncStorage.setItem('@user', JSON.stringify(res.data.signup.user))

    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={{padding: 20}}>

      <Box>
        <HStack alignItems="center" my={4}>
          <BackButton/>
          <Text style={{fontWeight: 'bold', fontSize: 30, marginTop: 10}}>Crear una cuenta</Text>
        </HStack>
        {/* <Box alignItems="center" justifyContent={"center"} w="90%" my="auto">
          <Image alt="adad" source={logo}></Image>
        </Box> */}
        <FormControl>
          <FormControl.Label>Nombre</FormControl.Label>
          <Input value={name} onChangeText={(val) => setName(val)}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input value={email} onChangeText={(val) => setEmail(val)}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Contraseña</FormControl.Label>
          <Input type="password" value={password} onChangeText={(val) => setPassword(val)}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Repita la contraseña</FormControl.Label>
          <Input type="password" value={passwordValidate} onChangeText={(val) => setPasswordValidate(val)}/>
        </FormControl>
        <Box>
          <Ripple onPress={handleSignUp} >
            <Button  mt={3} disabled={loading} colorScheme="primary" >
              Registrarse
            </Button>
          </Ripple>
        </Box>
      </Box>
    </SafeAreaView>
  )
}

export default SignUpScreen