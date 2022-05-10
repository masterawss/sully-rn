import { Badge, Box, Text, VStack } from "native-base";
import TopicItem from "../../../components/TopicItem";
import { TitleAction } from "../../../components/TitleAction"
import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query {
    getTodayUserTopics {
      id
      title
    }
  }
`

const SectionPendientesHoy = () => {

  const {loading, error, data} = useQuery(QUERY)

  function handleSuscritos(){
    console.log('asdasd');
  }
  return (
    <>
      <TitleAction title="Pendientes para hoy" actionDesc="Ver todos" action={handleSuscritos} />
      { loading && <Text>Cargando</Text> }

      { error && <Text>Ha ocurrido un error</Text> }
      {
        (!loading && !error) && data && 
        <VStack space={2}>
          { data.getTodayUserTopics.map((tema:any) => (
            <TopicItem key={tema.id} topic={tema} />
          ))}
        </VStack>
      }
    </>
  )
}

export default SectionPendientesHoy