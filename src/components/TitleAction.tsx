import { Button, HStack, Text } from "native-base"
import Ripple from "react-native-material-ripple"

export const TitleAction = ({title, actionDesc, action}) => {
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center">
        <Text bold>{title}</Text>
        <Ripple>
          <Button onClick={action} variant="ghost" colorScheme="primary" >
            {actionDesc}
          </Button>
        </Ripple>
      </HStack>
    </>
  )
}