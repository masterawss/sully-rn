import { Badge, Box, Button, Center, HStack, Icon, Text } from "native-base"
import { FontAwesome } from '@expo/vector-icons';
import Ripple from "react-native-material-ripple";
import moment from 'moment'
import 'moment/locale/es';
import { ImageBackground } from "react-native";
const TopicItem = ({topic, showCourse = false, ...props}) => {
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
                {moment(topic.startDate).format('hh:mm a')} - &nbsp;
                {moment(topic.endDate).format('hh:mm a')}
              </Text>
              <HStack alignItems="center" space={2} mt={2}>
                { showCourse && (
                  <>
                    <ImageBackground style={{width: 18, height: 18}} imageStyle={{ borderRadius: 10 }} source={{uri: topic.course.imgUrl}} />
                    <Text style={{color: 'gray', fontWeight: 'bold'}}>{topic.course.title}</Text>
                  </>
                )}
              </HStack>
            </Box>
            <Text>
              {moment(topic.startDate).format("dddd DD MMM")}
            </Text>
            {/* <Ripple>
            <Badge style={{borderRadius: 20}} colorScheme="success">
                <Text>{topic.type}</Text>
            </Badge>

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