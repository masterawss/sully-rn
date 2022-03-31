import { Box, Flex, HStack, Image, Text, VStack } from "native-base"
import { WItem } from "../../../components/Item"
import SimpleMenuBtn from "../../../components/SimpleMenuBtn"

export default TopBar = () => {
  return (
    <>
      <WItem 
        avatar={
          <Image alt="profile photo" borderRadius={100} size={10} source={{ uri: "https://wallpaperaccess.com/full/317501.jpg" }} />
        }
        title="Hola Will"
        subtitle="Bienvenido de vuelta"
        actions={(<>
          <SimpleMenuBtn color="white" iconName="bell" style={{marginRight: 4}} />
          <SimpleMenuBtn color="white" iconName="search" />
        </>)}
      />
    </>
  )
}