import AsyncStorage from '@react-native-async-storage/async-storage';
import { gql, useMutation } from "@apollo/client"
import { Box, Button, FormControl, Input, Link } from "native-base"
import { useContext, useState } from "react"
import Ripple from 'react-native-material-ripple'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../store/auth/authProvider';

const MUT = gql`
  mutation Login($email: String!, $password: String!) {
    login(email:$email, password: $password){
      user{
        id
        name
      }
      token
    }
  }
`

const LoginForm = () => {
  const { signIn, user } = useContext(AuthContext);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { loading, error, data }] = useMutation(MUT);
  const navigation = useNavigation();

  const handleLogin = async () => {
    const res = await login({ variables: { email, password} })
    // // console.log('RESPUESTA', res.data.login.token);
    const {user, token} = res.data.login
    await AsyncStorage.setItem('@token', token)
    await AsyncStorage.setItem('@user', JSON.stringify(user))
    signIn({user, token})
    navigation.navigate('Home')
  }

  return (
    <Box>
      <FormControl>
        <FormControl.Label>Email</FormControl.Label>
        <Input value={email} onChangeText={(val) => setEmail(val)}/>
      </FormControl>
      <FormControl>
        <FormControl.Label>Contraseña</FormControl.Label>
        <Input type="password" value={password} onChangeText={(val) => setPassword(val)}/>
        {/* <Link _text={{
          fontSize: "xs",
          fontWeight: "500",
          color: "indigo.500"
        }} alignSelf="flex-end" mt="1">
            Forget Password?
        </Link> */}
      </FormControl>
      <Box mt={3}>
        <Ripple onPress={handleLogin} >
          <Button disabled={loading} p={2.5} colorScheme="primary" >
            Ingresar
          </Button>
        </Ripple>
        <Ripple onPress={() => navigation.navigate('SignUp')} >
          <Button disabled={loading} p={2.5} mt={3} colorScheme="secondary" variant="outline" >
            Crear una nueva cuenta
          </Button>
        </Ripple>
      </Box>
    </Box>
  )
}

export default LoginForm