import { gql, useQuery } from "@apollo/client";
import { Box, HStack, Text } from "native-base";
import {ScrollView} from 'react-native'
import { TitleAction } from "../../../components/TitleAction"
import CourseSimpleItem from '../../course/components/SimpleItem'

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

  const { loading, error, data} = useQuery(QUERY)

  function handleSuscritos(){
    console.log('asdasd');
  }
  return (
    <>
      <TitleAction title="Cursos suscritos" actionDesc="Ver todos" action={handleSuscritos} />

      { loading && <Text>Cargando</Text> }

      { error && <Text>Ha ocurrido un error</Text> }
      <Text>{JSON.stringify(data)} asd</Text>

      <Text>Loading {JSON.stringify(loading)}</Text>
      <Text>Error {JSON.stringify(error)}</Text>
      <Text>DATA {JSON.stringify(data)}</Text>
      {
        (!loading && !error)
        && data
        &&
        <ScrollView horizontal={true} style={{marginRight: -12}}>
          <HStack space={3} >
            { data.getSuscribedCourses.map((curso:any) => (
                <CourseSimpleItem key={curso.id} course={curso} />
              ))
            }
          </HStack>
        </ScrollView>
      }
    </>
  )
}

export default SectionCursosSuscritos