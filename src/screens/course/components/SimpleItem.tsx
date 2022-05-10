import { useNavigation } from '@react-navigation/native';

import { Box, Stack, Text } from "native-base"
import { ImageBackground, StyleSheet } from "react-native"
import Ripple from "react-native-material-ripple"
import SimpleMenuBtn from '../../../components/SimpleMenuBtn';

const SimpleItem = ({course}) => {
  const navigation = useNavigation();

  return (
    <Ripple key={course.id} onPress={() => navigation.navigate('Course.Show', {id: course.id})}>
      <ImageBackground imageStyle={{ borderRadius: 10 }} style={decoration.photo} source={{uri: course.imgUrl}} >
        
        <Box rounded="xl" p="3" mt="auto">
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
    maxWidth: 200,
    width: '100%'
  },
});