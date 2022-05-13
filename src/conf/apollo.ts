import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_URL } from "./environments";

const httpLink = createHttpLink({
  uri: APP_URL+'/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =  await AsyncStorage.getItem('@token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const asyncAuthLink = setContext(
  request =>
    new Promise((success, fail) => {
      AsyncStorage.getItem('@token').then(token => success({ token: "async found token" }));
      // do some async lookup here
    })
);

let token;
const withToken = setContext(() => {
  // if you have a cached value, return it immediately
  if (token) return {
    authorization: token ? `Bearer ${token}` : ""
  };
  return AsyncStorage.getItem('@token').then(userToken => {
    token = userToken;
    console.log("TOKEN", token);
    return { authorization: token ? `Bearer ${token}` : "" };
  });
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// export const client = new ApolloClient({
//   // uri: 'http://localhost:19002/graphql',
//   uri: 'http://192.168.1.48:4000/graphql',
//   // uri: 'http://localhost:4000/graphql/',
//   cache: new InMemoryCache()
// })
