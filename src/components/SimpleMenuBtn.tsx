import { Button, Center, Icon } from "native-base"
import Ripple from "react-native-material-ripple"
import { FontAwesome } from '@expo/vector-icons';

const SimpleMenuBtn = (props) => {
  const {color, iconName} = props
  return (
    <>
      <Ripple {...props}>
        <Button bg={color} p={3} rounded="lg">
          <Center>
            <Icon as={<FontAwesome name={iconName} />} color="muted" size={5} />
          </Center>
        </Button>
      </Ripple>
    </>
  )
}

export default SimpleMenuBtn