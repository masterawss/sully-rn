import Ripple from "react-native-material-ripple"
import { useNavigation } from "@react-navigation/native";
import { Box, Flex, HStack, Image, Text, VStack } from "native-base"
import { WItem } from "../../../components/Item"
import SimpleMenuBtn from "../../../components/SimpleMenuBtn"

const TopBar = () => {
  const navigation = useNavigation();

  return (
    <>
      <WItem 
        avatar={
          <Ripple onPress={() => navigation.navigate('Profile')}>
            <Image alt="profile photo" borderRadius={100} size={10} source={{ uri: "https://wallpaperaccess.com/full/317501.jpg" }} />
          </Ripple>
        }
        title="Hola Will"
        subtitle="Bienvenido de vuelta"
        actions={(<>
          {/* <SimpleMenuBtn color="white" iconName="bell" style={{marginRight: 4}} /> */}
          <SimpleMenuBtn 
            color="white" 
            iconName="search"
            onPress={() => navigation.navigate("Explore")}
          />
        </>)}
      />
    </>
  )
}

export default TopBar