import { useNavigation } from '@react-navigation/native';

import { Box, Text } from "native-base"
import { ImageBackground, StyleSheet } from "react-native"
import Ripple from "react-native-material-ripple"

const SimpleItem = ({course}) => {
  const navigation = useNavigation();

  return (
    <Ripple key={course.id} onPress={() => navigation.navigate('Course.Show', {id: course.id})}>
      <ImageBackground imageStyle={{ borderRadius: 10 }} style={decoration.photo} source={{uri: course.imgUrl}} >
        <Box rounded="xl" p="2" mt="auto">
          <Text color="white" bold fontSize="sm">{course.title}</Text>
        </Box>
      </ImageBackground>
    </Ripple>
  )
}

export default SimpleItem

const decoration = StyleSheet.create({
  photo: {
    borderRadius: 20,
    height: 115,
    width: 200
  },
});