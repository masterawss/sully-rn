import { gql } from "@apollo/client"
import { HStack, ScrollView, Text, View, VStack } from "native-base"
import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TitleAction } from "../../components/TitleAction"
import TopicItem from "../../components/TopicItem"
import { client } from "../../conf/apollo"

import LottieView from 'lottie-react-native';
import Loader from "../../components/Loader"

import {Text as TextNative} from 'react-native'
import { BackButton } from '../../components/BackButton';

const QUERY = gql`
  query {
    getUserTopics {
      id
      title
      startDate
      endDate
      course{
        id
        imgUrl
        title
      }
    }
  }
`
const IndexScreen = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<[]>([])


  useEffect(() => {
    setLoading(true)
    client.query({
      query: QUERY,
      fetchPolicy: 'network-only',
    }).then(data => {
      setData(data.data.getUserTopics)
      // console.log('DATA', data);
    }).finally(() => setLoading(false))
  }, [])
  return (
    <>
      <SafeAreaView style={{padding: 12}}>
        <ScrollView>
          <HStack alignItems="center" mb={3}>
            <BackButton/>
            <TextNative style={{fontWeight: 'bold', fontSize: 25, marginTop: 10}}>Todos los temas</TextNative>
          </HStack>
          { loading && <Loader /> }
          {
            data &&
            <VStack space={2}>
              { data.map((tema:any) => (
                <TopicItem key={tema.id} topic={tema} showCourse />
              ))}
            </VStack>

          }
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default IndexScreen

