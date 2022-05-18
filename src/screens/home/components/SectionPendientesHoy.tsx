import { Badge, Box, Text, View, VStack } from "native-base";
import TopicItem from "../../../components/TopicItem";
import { TitleAction } from "../../../components/TitleAction"
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "../../../conf/apollo";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import Loader from "../../../components/Loader";

const QUERY = gql`
  query {
    getTodayUserTopics {
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

const SectionPendientesHoy = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<[]>([])

  useEffect(() => {
    setLoading(true)
    client.query({
      query: QUERY,
      fetchPolicy: 'network-only',
    }).then(data => {
      setData(data.data.getTodayUserTopics)
      // console.log('DATA', data);
    }).finally(() => setLoading(false))
  }, [])

  function handleSuscritos(){
    navigation.navigate('Topic.Index')
  }
  return (
    <>
      <TitleAction title="Pendientes para hoy" actionDesc="Ver todos" action={handleSuscritos} />
      {
        data &&
        <VStack space={2}>
          { data.map((tema:any) => (
            <TopicItem key={tema.id} topic={tema} showCourse />
          ))}
        </VStack>
      }
    </>
  )
}

export default SectionPendientesHoy