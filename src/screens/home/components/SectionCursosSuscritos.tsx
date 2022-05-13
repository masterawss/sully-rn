import { gql, useQuery } from "@apollo/client";
import { Box, HStack, Text, View } from "native-base";
import { useEffect, useState } from "react";
import {ActivityIndicator, ScrollView} from 'react-native'
import { TitleAction } from "../../../components/TitleAction"
import CourseSimpleItem from '../../course/components/SimpleItem'
import {client} from '../../../conf/apollo'
import Loader from "../../../components/Loader";

const QUERY = gql`
  query{
    getSuscribedCourses{
      id
      title
      createdAt
      imgUrl
    }
  }
`
const SectionCursosSuscritos = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<[]>([])

  useEffect(() => {
    setLoading(true)
    client.query({
      query: QUERY,
      fetchPolicy: 'network-only',
    }).then(data => {
      setData(data.data.getSuscribedCourses)
      console.log('DATA', data);
    }).finally(() => setLoading(false))
  }, [])


  function handleSuscritos(){
    console.log('asdasd');
  }
  return (
    <>
      <TitleAction title="Cursos suscritos" actionDesc="Ver todos" action={handleSuscritos} />

      { loading && <Loader /> }

      {
        data &&
        <ScrollView horizontal={true} style={{marginRight: -12}}>
          <HStack space={3} >
            { data.map((curso:any) => (
                <Box key={curso.id} style={{width: 200}}>
                  <CourseSimpleItem course={curso} />
                </Box>
              ))
            }
          </HStack>
        </ScrollView>
      }
    </>
  )
}

export default SectionCursosSuscritos