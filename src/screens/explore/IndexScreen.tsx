import { FlatGrid } from 'react-native-super-grid';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Box, Button, Divider, HStack, Icon, Input, Stack, Text, VStack } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";

import { useLazyQuery } from '@apollo/client';
import { ScrollView } from "react-native";
import CourseSimpleItem from '../course/components/SimpleItem'
import SimpleMenuBtn from "../../components/SimpleMenuBtn";
import SimpleExploreItem from '../course/components/SimpleExploreItem';
import {Text as TextNative} from 'react-native'
import { BackButton } from '../../components/BackButton';
import Loader from '../../components/Loader';
const QUERY = gql`
  query searchCourses($query: String!){
    searchCourses(query: $query){
      id
      title
      createdAt
      imgUrl
      isSuscribed
      users{
        user{
          name
        }
      }
    }
  }
`

const IndexScreen = () => {

  const [query, setQuery] = useState<string>("")

  const [coursesFounded] = useLazyQuery(QUERY);

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [result, setResult] = useState<[]>([])

  const search = async () => {
    if(query.length > 0){
      setLoading(true)
      const r = await coursesFounded({ variables: { query: query } })
      setLoading(false)
      setResult(r?.data?.searchCourses)
    }
  }

  return (
    <SafeAreaView style={{padding: 5}}>
      <Stack mt={3} space={4}>
        <HStack alignItems="center">
          <BackButton/>
          <TextNative style={{fontWeight: 'bold', fontSize: 30, marginTop: 10}}>Explorar</TextNative>
        </HStack>
        <Input
          variant="rounded"
          value={query}
          onChangeText={setQuery}
          size="md"
          placeholder="Buscar cursos ... "
          InputRightElement={
            <Button size="xs" rounded="none" w="1/6" h="full" onPress={search}>
              <Icon as={<FontAwesome name="search" /> } size={5} color="white" />
            </Button>
          }
        />
        { loading && <Loader/>}

        {/* <Text>Loading {JSON.stringify(loading)}</Text>
        <Text>Error {JSON.stringify(error)}</Text>
        <Text>DATA {JSON.stringify(data)}</Text> */}

        {
          result &&
          <FlatGrid
              itemDimension={130}
              data={result}
              renderItem={({ item  }) => (
                <SimpleExploreItem course={item}/>
              )}
            />
        }
      </Stack>

    </SafeAreaView>
  )
}

export default IndexScreen