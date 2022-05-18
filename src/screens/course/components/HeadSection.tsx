import { gql } from "@apollo/client"
import { Box, HStack, Image, ScrollView, Text } from "native-base"
import { useEffect, useState } from "react"
import { ImageBackground, StyleSheet } from "react-native"
import { WItem } from "../../../components/Item"
import { client } from "../../../conf/apollo"
import { BackButton } from '../../../components/BackButton';

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
const HeadSection = ({id}:any) => {

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>({})

  useEffect(() => {
    setLoading(true)
    client.query({
      query: QUERY,
      variables: {id},
      fetchPolicy: 'network-only',
    }).then(data => {
      setData(data.data.getCourseById)
      // console.log('DATA', data);
    }).finally(() => setLoading(false))
  }, [])

  return (
    <>
      {
        loading && <>
          <Box style={{height: 120, backgroundColor: 'gray'}}>
            <Box p="2" mt="auto">
              <HStack alignItems="center">
                <BackButton color="white"/>
                <Text color="white" bold fontSize="md">Cargando ...</Text>
              </HStack>
            </Box>
          </Box>
        </>
      }
      { !loading && data &&
        <>
            <ImageBackground  style={decoration.photo} source={{uri: data.imgUrl}} >
              <Box p="2" mt="auto">
                <HStack alignItems="center">
                  <BackButton color="white"/>
                  <Text color="white" bold fontSize="md">{data.title}</Text>

                </HStack>
              </Box>
            </ImageBackground>
            {/*
            <Text my={2} color="muted.500" fontSize="md">{data.description}</Text>
            <WItem
              mt={2}
              avatar={<Image alt="profile photo" borderRadius={100} size={10} source={{ uri: data.entity?.avatarUrl }} />}
              title={data.entity?.name}
            />
            */}
        </>
      }
    </>
  )
}

export default HeadSection

const decoration = StyleSheet.create({
  photo: {
    borderRadius: 20,
    height: 120,
    width: '100%'
  },
});