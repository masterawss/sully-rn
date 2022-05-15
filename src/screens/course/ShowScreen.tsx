import { gql, useQuery } from "@apollo/client"
import { Box, Button, Center, HStack, Icon, Image, ScrollView, Text, View, VStack } from "native-base"
import { useEffect, useState } from "react"
import { ImageBackground, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { WItem } from "../../components/Item"
import TopicItem from "../../components/TopicItem"
import { client } from "../../conf/apollo"
import HeadSection from "./components/HeadSection"
import SimpleItem from "./components/SimpleItem"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

import {BottomFabBar} from 'rn-wave-bottom-bar'
import TopicosScreen from "./tabs/TopicosScreen"
import AlumnosScreen from "./tabs/AlumnosScreen"
import ChatScreen from "./tabs/ChatScreen"


import Ripple from "react-native-material-ripple"


const ShowScreen = ({route, navigation}:any) => {
  const {id} = route.params

  const [tab, setTab] = useState<string>('topicos')

  return (
    <SafeAreaView >
      <ScrollView>
        <HeadSection id={id}/>
        <View style={{padding: 10}}>

          <HStack style={{marginVertical: 10}} space={3} justifyContent="flex-start">
            <Ripple onPress={() => setTab('topicos')} >
              <Box style={ tab !== 'topicos' ? style.buttonInactive : style.buttonActive  }
                >
                  <FontAwesome name="user"/>
                  <Text> Tópicos </Text>
              </Box>
            </Ripple>
            {/*
            <Ripple onPress={() => setTab('alumnos')} >
              <Box style={ tab !== 'alumnos' ? style.buttonInactive : style.buttonActive  }
                >
                  <FontAwesome name="list"/>
                  <Text> Alumnos </Text>
              </Box>
            </Ripple>
            */}
            <Ripple onPress={() => setTab('chat')} >
              <Box style={ tab !== 'chat' ? style.buttonInactive : style.buttonActive  }
                >
                  <FontAwesome name="comments"/>
                  <Text> Chat </Text>
              </Box>
            </Ripple>
          </HStack>
          { tab === 'topicos' && <TopicosScreen courseId={id}/> }
          { tab === 'alumnos' && <AlumnosScreen courseId={id}/> }
          { tab === 'chat' && <ChatScreen courseId={id}/> }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ShowScreen

const style = StyleSheet.create({
  buttonActive:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderRadius: 100,
    color: 'white',
    backgroundColor: '#00a680',
  },
  buttonInactive:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderRadius: 100,
    color: '#00a680',
    backgroundColor: 'transparent',
    borderColor: '#00a680',
    borderWidth: 2
  }
})