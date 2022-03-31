import { Box, Center, Image, Text, VStack } from "native-base"
import { ImageBackground, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { WItem } from "../../components/Item"
import TopicItem from "../../components/TopicItem"
import SimpleItem from "./components/SimpleItem"

const ShowScreen = ({route, navigation}) => {
  const {id} = route.params

  const course = {
    id: 1,
    title: 'Bootcamp fullstack javascript',
    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    imgUrl: 'https://i.pinimg.com/564x/4a/7e/20/4a7e20100668cc492e4635d3bd6e180c.jpg',
    entity: {
      id: 1,
      title: 'Make It Real',
      imgUrl: 'https://i.pinimg.com/564x/4a/7e/20/4a7e20100668cc492e4635d3bd6e180c.jpg',
    },
    teacher: {
      id: 1,
      title: 'Anthony Will Solsol Soplin',
      subtitle: 'Software developer',
      imgUrl: 'https://i.pinimg.com/564x/4a/7e/20/4a7e20100668cc492e4635d3bd6e180c.jpg',
    },
    topics: [
      {
        id: 1,
        title: 'Anthony Will Solsol Soplin',
        horario: 'Software developer',
        type: 'Nuevo tema'
      },
      {
        id: 2,
        title: 'Anthony Will Solsol Soplin',
        horario: 'Software developer',
        type: 'Nuevo tema'
      },
    ]
  }

  return (
    <SafeAreaView style={{padding: 5}}>
      <ImageBackground imageStyle={{ borderRadius: 10 }} style={decoration.photo} source={{uri: course.imgUrl}} >
        <Box p="2" mt="auto">
          <Text color="white" bold fontSize="md">{course.title}</Text>
        </Box>
      </ImageBackground>
      <Text my={2} color="muted.500" fontSize="md">{course.subtitle}</Text>
      <WItem
        mt={2 }
        avatar={<Image alt="profile photo" borderRadius={100} size={10} source={{ uri: course.entity.imgUrl }} />}
        title={course.entity.title}
      />
      <WItem
        mt={2 }
        avatar={<Image alt="profile photo" borderRadius={100} size={10} source={{ uri: course.teacher.imgUrl }} />}
        title={course.teacher.title}
        subtitle={course.teacher.subtitle}
      />

      <Text my={3} bold color="muted.500">Listado de tópicos</Text>

      <VStack space="3">
        {course.topics.map(topic => <TopicItem style={{border: '4px'}} key={topic.id} topic={topic} />)}
      </VStack>

    </SafeAreaView>
  )
}

export default ShowScreen

const decoration = StyleSheet.create({
  photo: {
    borderRadius: 20,
    height: 120,
    width: '100%'
  },
});