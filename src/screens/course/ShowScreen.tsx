import { gql, useQuery } from "@apollo/client"
import { Box, Center, Image, ScrollView, Text, VStack } from "native-base"
import { useEffect } from "react"
import { ImageBackground, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { WItem } from "../../components/Item"
import TopicItem from "../../components/TopicItem"
import SimpleItem from "./components/SimpleItem"

const QUERY = gql`
  query
    GetCourseById($id: ID!) {
      getCourseById(id: $id){
        title
        description
        imgUrl
        isSuscribed
        entity{
          name
          avatarUrl
        }
        topics{
          title
          description
        }
        users{
          user{
            id
            name
          }
        }
      }
    }
`

const ShowScreen = ({route, navigation}:any) => {
  const {id} = route.params

  const { loading, error, data} = useQuery(QUERY, {variables: {id}})


  return (
    <SafeAreaView style={{padding: 5}}>

      { loading && <Text>Cargando</Text> }

      { error && <Text>Ha ocurrido un error</Text> }
      {
        (!loading && !error)
        && data
        && 
        <ScrollView horizontal={true} style={{marginRight: -12}}>
          <ImageBackground imageStyle={{ borderRadius: 10 }} style={decoration.photo} source={{uri: data.getCourseById.imgUrl}} >
            <Box p="2" mt="auto">
              <Text color="white" bold fontSize="md">{data.getCourseById.title}</Text>
            </Box>
          </ImageBackground>
          <Text my={2} color="muted.500" fontSize="md">{data.getCourseById.subtitle}</Text>
          <WItem
            mt={2}
            avatar={<Image alt="profile photo" borderRadius={100} size={10} source={{ uri: data.getCourseById.entity.imgUrl }} />}
            title={data.getCourseById.entity.title}
          />
          <WItem
            mt={2 }
            avatar={<Image alt="profile photo" borderRadius={100} size={10} source={{ uri: data.getCourseById.teacher.imgUrl }} />}
            title={data.getCourseById.teacher.title}
            subtitle={data.getCourseById.teacher.subtitle}
          />

          <Text my={3} bold color="muted.500">Listado de tópicos</Text>

          <VStack space="3">
            {data.getCourseById.topics.map(topic => <TopicItem style={{border: '4px'}} key={topic.id} topic={topic} />)}
          </VStack>
        </ScrollView>
      }
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