import { gql } from "@apollo/client"
import { HStack, Text, VStack } from "native-base"
import { useEffect, useState } from "react"
import { client } from "../../../conf/apollo"
import { FlatGrid } from 'react-native-super-grid';

const QUERY = gql`
  query
    GetCourseById($id: ID!) {
      getCourseById(id: $id){
        users{
          user{
            id
            name
          }
        }
      }
    }
`

const AlumnosScreen = ({ courseId }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>({})

  useEffect(() => {
    setLoading(true)
    client.query({
      query: QUERY,
      variables: { id: Number(courseId) },
      fetchPolicy: 'network-only',
    }).then(data => {
      setData(data.data.getCourseById.users)
      // console.log('DATA', data);
    }).finally(() => setLoading(false))
  }, [])

  return (
    <>
        <VStack>

          <HStack>
            <Text>{data}</Text>
          </HStack>
        </VStack>
      <FlatGrid
        itemDimension={130}
        data={data}
        renderItem={({ item  }) => (
          <>
          </>
        )}
      />
    </>
  )
}


export default AlumnosScreen