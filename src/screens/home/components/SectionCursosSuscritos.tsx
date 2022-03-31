import { Box, HStack } from "native-base";
import {ScrollView} from 'react-native'
import { TitleAction } from "../../../components/TitleAction"
import CourseSimpleItem from '../../course/components/SimpleItem'

const cursos = [
  {
    id: 1,
    title: 'Bootcamp - Full Stack Javascript',
    imgUrl: 'https://i.pinimg.com/564x/38/5b/21/385b2104f737ed45660fc2f374210b66.jpg'
  },
  {
    id: 2,
    title: 'Bootcamp - Habilidades blandas',
    imgUrl: 'https://i.pinimg.com/564x/4a/7e/20/4a7e20100668cc492e4635d3bd6e180c.jpg'
  },
  {
    id: 3,
    title: 'Bootcamp - Inglés',
    imgUrl: 'https://i.pinimg.com/564x/4b/3d/22/4b3d2229caa0a6ac4090e566aa5d36d3.jpg'
  },
]

const SectionCursosSuscritos = () => {
  

  function handleSuscritos(){
    console.log('asdasd');
  }
  return (
    <>
      <TitleAction title="Cursos suscritos" actionDesc="Ver todos" action={handleSuscritos} />
      <ScrollView horizontal={true} style={{marginRight: -12}}>
        <HStack space={3} >
          { cursos.map(curso => (
              <CourseSimpleItem key={curso.id} course={curso} />
            ))
          }
        </HStack>
      </ScrollView>
    </>
  )
}

export default SectionCursosSuscritos