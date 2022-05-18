import { FlatGrid } from 'react-native-super-grid';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Box, Button, Center, Divider, HStack, Icon, Input, Stack, Text, VStack } from "native-base"
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
      // console.log('RESULTADOS', r?.data?.searchCourses);
      
      setResult(r?.data?.searchCourses)
    }
  }

  useEffect(() => {
    if(query.length == 0) setResult([])
  }, [query])

  return (
    <SafeAreaView style={{padding: 5}}>
      <VStack mt={3} space={4}>
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
        { loading && <Box mt={30}><Loader/></Box>}

        {/* <Text>Loading {JSON.stringify(loading)}</Text>
        <Text>Error {JSON.stringify(error)}</Text>
        <Text>DATA {JSON.stringify(data)}</Text> */}

        {
          query.length == 0 &&  !loading &&
            <Center mt={6}>
              <Icon as={<FontAwesome name="search" /> } size={20} color="gray.500" />
              <TextNative style={{fontWeight: 'bold', fontSize: 23, marginTop: 10}}>Busca los cursos</TextNative>
              <Text style={{textAlign: 'center'}} mt={3}>
                Intenta buscando cursos como: React, Node, Inglés o Habilidades blandas.
              </Text>
            </Center>
        }

        {
          query.length !== 0 && result && !loading &&
          <FlatGrid
              itemDimension={130}
              data={result}
              renderItem={({ item  }) => (
                <SimpleExploreItem course={item}/>
              )}
            />
        }
      </VStack>

    </SafeAreaView>
  )
}

export default IndexScreen