import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { Box, HStack, Stack, Text } from "native-base"
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from "react-native"
import Ripple from "react-native-material-ripple"
import SimpleMenuBtn from '../../../components/SimpleMenuBtn';

import CourseSimpleItem from '../../course/components/SimpleItem'

const MUT = gql`
  mutation setToogleCourseSucribed($courseId: ID!){
    setToogleCourseSucribed(courseId: $courseId){
      success
      eliminated
      created
    }
  }
`

const SimpleExploreItem = ({course}: any) => {
  const navigation = useNavigation();
  const [isSuscribed, setIsSuscribed] = useState<boolean>(course.isSuscribed)

  const [setSuscribeToogle, { loading, error, data }] = useMutation(MUT);

  // useEffect(() => {

  // }, [])

  const handlePress = () => {
    setSuscribeToogle({ variables: { courseId: course.id } }).then(r => {
      // console.log('RESP', r);
      setIsSuscribed(is => !is)
    })
    // alert('asd')
  }
  return (
    <Box color="white" bgColor={'white'} style={{ borderRadius: 10 }} >
      <CourseSimpleItem course={course} />
      <HStack justifyContent="space-between" alignItems="center">
        <Text ml={4}>{course.users.length} usuarios</Text>
        <Box ml="auto" mt="1">
          <SimpleMenuBtn
            onPress={handlePress}
            colorIcon={isSuscribed ? 'black' : 'gray.200'} 
            color="white"
            iconName="bookmark"
            style={{marginRight: 4}} />
        </Box>
      </HStack>
    </Box>
  )
}

export default SimpleExploreItem
