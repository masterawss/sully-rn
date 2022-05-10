import { Box, Button, Center, Icon } from "native-base"
import Ripple from "react-native-material-ripple"
import { FontAwesome } from '@expo/vector-icons';

const SimpleMenuBtn = (props:any) => {
  const {color, iconName, colorIcon = 'muted'} = props
  return (
    <>
      <Ripple {...props}>
        <Button bg={color} p={3} rounded="lg">
            <Box mx="auto">
              <Icon as={<FontAwesome name={iconName} />} color={colorIcon} size={5} />
            </Box>
          <Center>
          </Center>
        </Button>
      </Ripple>
    </>
  )
}

export default SimpleMenuBtn