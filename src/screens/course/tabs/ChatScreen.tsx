import { Box, Button, Icon, Input, Stack, Text } from "native-base"
import { useCallback, useEffect, useState } from "react";
import { disconnectSocket, initiateSocket, subscribeToChat, sendMessage } from "../../../conf/socket";
import { FontAwesome } from '@expo/vector-icons';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessageBox = ({data, currentUser}) => {

  const textMessageStyle = currentUser.id === data.user.id
    ? style.myMessageText
    : style.otherMessageText

  return (
    <>
      <View style={ currentUser.id === data.user.id ? style.myMessageBox : style.otherMessageBox}>
        <Text style={{...textMessageStyle, fontWeight: 'bold'}}>
          {data.user.name}
        </Text>
        <Text style={textMessageStyle}>
          {data.text}
        </Text>
      </View>
    </>
  )
}

const ChatScreen = ({ courseId }) => {
  const [user, setUser] = useState({})
  const [room, setRoom] = useState(courseId);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<any>([]);

  useEffect(() => {
    AsyncStorage.getItem('@user').then(user => {
      setUser(JSON.parse(user))
    })
  }, [])

  useEffect(() => {
    if (room) initiateSocket(room);
    subscribeToChat((err: any, data: any) => {
      if(err) return;
      setChat(oldChats =>[...oldChats, data ])
    });
    return () => {
      disconnectSocket();
    }
  }, [room]);

  const handleSend = () => {
    sendMessage(room,{user, text: message})
    setMessage('')
  }

  return (
    <>
      <View style={style.containerMain}>
      <ScrollView style={style.containerMain}>
          { chat.map((data,i) => (
            <MessageBox currentUser={user} data={data} key={i}></MessageBox>
          ))}

        </ScrollView>
          <Box style={style.footer}>
            <Input
              variant="rounded"
              value={message}
              onChangeText={setMessage}
              size="md"
              placeholder="Escribir mensaje ... "
              InputRightElement={
                <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleSend}>
                  <Icon as={<FontAwesome name="arrow-right" /> } color="white" size={5} />
                </Button>
              }
            />
          </Box>
      </View>
        {/*
        <GiftedChat
            messages={chat}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        */}

    </>
  )
}

export default ChatScreen

const style =StyleSheet.create({
  containerMain: {
    flex: 1,
    height: Dimensions.get('window').height-190,
  },
  footer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  myMessageBox: {
    alignSelf: 'flex-end', 
    borderTopRightRadius: 2, 
    borderBottomRightRadius: 10, 
    borderBottomLeftRadius: 10, 
    borderTopLeftRadius: 10, 
    backgroundColor: '#19bbd4', 
    maxWidth: 200, 
    padding: 10, 
    margin: 6 
  },
  myMessageText:{
    color: 'white',
    textAlign: 'right'
  },
  otherMessageBox: {
    borderTopRightRadius: 10, 
    borderBottomRightRadius: 10, 
    borderBottomLeftRadius: 10, 
    borderTopLeftRadius: 2, 
    backgroundColor: '#e0e0e0', 
    maxWidth: 200, 
    padding: 10, 
    margin: 6 
  },
  otherMessageText:{
    color: '#616161',
    textAlign: 'right'
  }
})