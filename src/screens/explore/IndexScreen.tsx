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

  const [coursesFounded, { loading, error, data }] = useLazyQuery(QUERY);

  const [result, setResult] = useState<[]>([])

  const search = async () => {
    if(query.length > 0){
      const r = await coursesFounded({ variables: { query: query } })
      setResult(r?.data?.searchCourses)
    }
  }

  return (
    <SafeAreaView style={{padding: 5}}>
      <Stack mt={3} space={4}>
        <Input
          value={query}
          onChangeText={setQuery}
          size="md"
          placeholder="Buscar cursos ... "
          InputLeftElement={<Icon as={<FontAwesome name="search" />} size={5} ml="2" color="muted.400" />} 
          InputRightElement={
            <Button size="xs" rounded="none" w="1/6" h="full" onPress={search}>
              <Icon as={<FontAwesome name="search" /> } size={5} />
            </Button>
          }
        />
      </Stack>

      { loading && <Text>Cargando</Text> }

      { error && <Text>Ha ocurrido un error</Text> }

      {/* <Text>Loading {JSON.stringify(loading)}</Text>
      <Text>Error {JSON.stringify(error)}</Text>
      <Text>DATA {JSON.stringify(data)}</Text> */}

      {
        data?.searchCourses &&
        <FlatGrid
            itemDimension={130}
            data={data.searchCourses}
            renderItem={({ item  }) => (
              <SimpleExploreItem course={item}/>
            )}
          />
      }
    </SafeAreaView>
  )
}

export default IndexScreen