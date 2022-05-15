import { Button, Icon } from "native-base"
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export const BackButton = ({color = "black"}) => {
  const navigation = useNavigation()
  return (
    <Button onPress={() => navigation.goBack()} variant="ghost">
      <Icon as={<FontAwesome name="arrow-left" /> } size={5} color={color}  />
    </Button>
  )
}