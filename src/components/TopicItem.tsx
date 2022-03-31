import { Badge, Box, Button, Center, HStack, Icon, Text } from "native-base"
import { FontAwesome } from '@expo/vector-icons';
import Ripple from "react-native-material-ripple";

const TopicItem = ({topic, ...props}) => {
  return (
    <>
      <Ripple>
        <Box {...props} bg="white" style={{borderRadius: 10}} p={5} >
          <HStack justifyContent="space-between">
            <Box>
              <Text bold>
                {topic.title}
              </Text>
              <Text>
                {topic.horario}
              </Text>
            </Box>
            <Badge style={{borderRadius: 20}} colorScheme="success">
                <Text>{topic.type}</Text>
              </Badge>
            {/* <Ripple>

              <Button bg="white">
                <Center>
                  <Icon as={<FontAwesome name='angle-right' />} color="muted" size={6} />
                </Center>
              </Button>
            </Ripple> */}
          </HStack>
        </Box>
      </Ripple>
    </>
  )
}
export default TopicItem