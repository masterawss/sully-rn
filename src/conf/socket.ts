import io from 'socket.io-client';
import { APP_URL } from './environments';
let socket;
export const initiateSocket = (room: any) => {
  socket = io(APP_URL);
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit('join', room);
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}
export const subscribeToChat = (cb: any) => {
  if (!socket) return(true);
  socket.on('chat', (msg: any) => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}
export const sendMessage = (room: any, message: any) => {
  if (socket) socket.emit('chat', { message, room });
}