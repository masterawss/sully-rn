import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { authReducer } from "./reducer/auth.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  name: string
  id: string
}

type AuthContextState = {
  token: string|null,
  user: User|null,
  isLoading: boolean
  isSignedIn: boolean
  signIn: ({token, user}: {token: string, user: User}) => void
  signUp: ({token, user}: {token: string, user: User}) => void
  signOut: () => void
}

const initialState: AuthContextState = {
  token: null,
  user: null,
  isLoading: true,
  isSignedIn: false,
  signIn: () =>{},
  signUp: () =>{},
  signOut: () =>{}
}

export const AuthContext = createContext<AuthContextState>(initialState)

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState<User|null>(initialState.user)
  const [token, setToken] = useState<string|null>(initialState.token)
  const [isLoading, setIsLoading] = useState<boolean|null>(initialState.isLoading)

  const isSignedIn  = useMemo(() => !!user, [user])

  const authContext = useMemo(() => ({
    signIn: async ({user, token}) => {
      setUser(user)
      setToken(token)
    },
    signOut: () => {
      setUser(null)
      setToken(null)
    },
    signUp: async ({user, token}) => {
      setUser(user)
      setToken(token)
    },
  }), [])

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      setIsLoading(true)
      const token =  await AsyncStorage.getItem('@token');
      const user =  await AsyncStorage.getItem('@user');

      setUser(JSON.parse(user))
      setToken(token)

      setIsLoading(false)

    };

    bootstrapAsync();
  }, []);

  // const [state, dispatch] = useReducer(authReducer, initialState);

  // useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let userToken: string | null = null;

  //     try {
  //       const userToken =  await AsyncStorage.getItem('@token');
  //     } catch (e) {
  //       // Restoring token failed
  //     }
  //     dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  //   };

  //   bootstrapAsync();
  // }, []);


  // const authContext = useMemo(() => ({
  //   signIn: async ({user, token}) => {
  //     dispatch({ type: 'SIGN_IN', payload: { user, token } });
  //   },
  //   signOut: () => dispatch({ type: 'SIGN_OUT' }),
  //   signUp: async ({user, token}) => {
  //     dispatch({ type: 'SIGN_IN', token: {user, token} });
  //   },
  // }), [])


  return (
    <AuthContext.Provider value={{...authContext, user, token, isLoading, isSignedIn}} >
      {children}
    </AuthContext.Provider>
  )
}