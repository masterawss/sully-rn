import { Center, Image, Text } from "native-base"
import { SafeAreaView } from "react-native"
import logo from '../../assets/logo.png'
const SplashScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
        <Center w="100%" h="100%">
          <Image alt="adad" source={logo}></Image>
          <Text fontSize={15} bold>
            Cargando
          </Text>
        </Center>
    </SafeAreaView>
  )
}

export default SplashScreen