import { Badge, Box, Text, VStack } from "native-base";
import TopicItem from "../../../components/TopicItem";
import { TitleAction } from "../../../components/TitleAction"

const temas = [
  {
    id: 1,
    title: 'React JS - Custom hook',
    horario: '06:00 pm - 08:00 pm',
    type: 'Nuevo tema'
  },
  {
    id: 2,
    title: 'Presentación',
    horario: '08:00 pm - 10:00 pm',
    type: 'Examen'
  },
]

const SectionPendientesHoy = () => {
  function handleSuscritos(){
    console.log('asdasd');
  }
  return (
    <>
      <TitleAction title="Pendientes para hoy" actionDesc="Ver todos" action={handleSuscritos} />
      <VStack space={2}>
        { temas.map(tema => (
          <TopicItem key={tema.id} topic={tema} />
        ))}
      </VStack>
    </>
  )
}

export default SectionPendientesHoy