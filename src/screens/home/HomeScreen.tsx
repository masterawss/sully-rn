import { VStack } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"
import Greeting from "./components/Greeting"
import SectionCursosSuscritos from "./components/SectionCursosSuscritos"
import SectionPendientesHoy from "./components/SectionPendientesHoy"
import TopBar from "./components/TopBar"

const HomeScreen = () => {
  return(
    <>
      <SafeAreaView style={{padding: 12}}>
        <VStack space={4}>
          <TopBar/>
          <Greeting/>
          <SectionCursosSuscritos />
          <SectionPendientesHoy />
        </VStack>
      </SafeAreaView>
    </>
  )
}

export default HomeScreen