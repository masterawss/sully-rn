import { createContext, useEffect, useMemo, useReducer } from "react";
import { authReducer } from "./reducer/auth.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isLoading: false,
  isSignout: false,
  token: null,
  user: null,
}

export const AuthContext = createContext<any|null>(null)

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken: string | null = null;

      try {
        const userToken =  await AsyncStorage.getItem('@token');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);


  const authContext = useMemo(() => ({
    signIn: async ({user, token}) => {
      dispatch({ type: 'SIGN_IN', payload: { user, token } });
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    signUp: async ({user, token}) => {
      dispatch({ type: 'SIGN_IN', token: {user, token} });
    },
  }), [])


  return (
    <AuthContext.Provider value={authContext} >
      {children}
    </AuthContext.Provider>
  )
}