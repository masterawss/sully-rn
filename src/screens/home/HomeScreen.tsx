import { Center, Text, View, VStack } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"
import { TitleAction } from "../../components/TitleAction"
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
        {/* <Text>asdasda sddasd</Text> */}
      </SafeAreaView>
    </>
  )
}

export default HomeScreen