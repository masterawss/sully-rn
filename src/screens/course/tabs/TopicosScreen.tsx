import { gql } from "@apollo/client"
import { Text, VStack, View } from "native-base"
import { useEffect, useState } from "react"
import Loader from "../../../components/Loader"
import TopicItem from "../../../components/TopicItem"
import { client } from "../../../conf/apollo"

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
          id
          title
          description
          startDate
          endDate
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

const TopicosScreen = ({ courseId }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>({})

  useEffect(() => {
    setLoading(true)
    client.query({
      query: QUERY,
      variables: { id: Number(courseId) },
      fetchPolicy: 'network-only',
    }).then(data => {
      setData(data.data.getCourseById)
      // console.log('DATA', data);
    }).finally(() => setLoading(false))
  }, [])

  return (
    <View>
      <Text my={3} bold color="muted.500">Listado de tópicos</Text>
      { loading && <Loader /> }
      <VStack space="3">
        {data.topics?.map((topic: any) => <TopicItem style={{border: '4px'}} key={topic.id} topic={topic} />)}
      </VStack>
    </View>
  )
}

export default TopicosScreen