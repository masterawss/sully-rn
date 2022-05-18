import { SafeAreaView } from "react-native"
import { Box, Button, Center, Image, Text } from "native-base"
import Ripple from "react-native-material-ripple"
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth/authProvider";
import { useContext } from "react";

const ProfileScreen = () => {

  const { signOut, user } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ backgroundColor: "white", padding: 12 }}>
      
        <Center my={50}>
          <Image alt="profile photo" borderRadius={100} size={100} source={{ uri: "https://wallpaperaccess.com/full/317501.jpg" }} />

          <Text fontSize={15} bold>
            {user.name}
          </Text>
        </Center>

        <Ripple onPress={signOut}>
          <Button p={2.5} mt={3} colorScheme="secondary" variant="outline" >
            Cerrar sesión
          </Button>
        </Ripple>
    </SafeAreaView>
  )
}

export default ProfileScreen