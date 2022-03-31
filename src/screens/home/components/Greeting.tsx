import { Box, Center, Text } from "native-base"
import { ImageBackground, StyleSheet } from "react-native"

const Greeting = () => {
  return (
    <>
      <ImageBackground imageStyle={{ borderRadius: 10 }} style={decoration.photo} source={{uri: imgUrl}} >
        <Center p="2" my="auto">
          <Text color="white" bold fontSize="sm">No tienes actividades hoy 🥳</Text>
        </Center>
      </ImageBackground>
    </>
  )
}
export default Greeting

const imgUrl = "https://i.pinimg.com/564x/3a/85/35/3a8535f76a29c810c190482bede5273b.jpg"

const decoration = StyleSheet.create({
  photo: {
    borderRadius: 20,
    height: 115,
    width: '100%'
  },
});