import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user:{
    _id:"638baccd98cdaf1eee468132",
    username:"tester1",
    email:"tester1@gmail.com",
    password:"$2b$10$CtW7obnwftqbp4nM.9wVGuOiLacubnpP0vQEWwMHdyrfFOabneqgu",
    profilePicture:"",
    coverPicture:"",
    isAdmin:false,
    followers:[],
    followings:[]
  },
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)

    return(
        <AuthContext.Provider
        value={{
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
}