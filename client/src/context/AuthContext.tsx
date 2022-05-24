import { createContext, useReducer } from 'react'
import toast from 'react-hot-toast';
import lacuentaApi from '../api/lacuentaApi';
import { LoginData, LoginResponse, RegisterData, RegisterResponse } from '../interfaces/interfaces';
import { authReducer, AuthState } from './authReducer';

interface Props { children: JSX.Element | JSX.Element[] }

const INITIAL_STATE: AuthState = {
    checking: true,
    logged: false,
    user: null
}

interface AuthContextProps {
    user: AuthState,
    register: (data: RegisterData) => void,
    login: (data: LoginData) => void,
    logout: () => void,
    starChecking: () => void,
}


export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: Props) => {

    const [user, dispatch] = useReducer(authReducer, INITIAL_STATE)

    const register = async (datos: RegisterData) => {

        dispatch({type:'START_CHECKING'})
        try {
            const config = {
                headers: { "Content-Type": "application/json" }
            };

            const { data } = await lacuentaApi.post<RegisterResponse>('/auth/register', datos, config)

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch({
                type: 'LOGIN',
                payload: data.user
            })
            dispatch({type:'END_CHECKING'})

        } catch (error: any) {
            console.log(error.response.data.errors[0].msg)
            if((error.response.data.errors[0].msg).includes('is already taken')) toast.error('El email ya existe')
            dispatch({type:'END_CHECKING'})
        }
    }

    const login = async (datos: LoginData) => {

        dispatch({type:'START_CHECKING'})

        try {
            const { data } = await lacuentaApi.post<LoginResponse>('/auth/login', datos)

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch({
                type: 'LOGIN',
                payload: data.user
            })
            dispatch({type:'END_CHECKING'})


        } catch (error: any) {
            toast.error('Email o password no válidos')
            console.log(error.response.data.msg)
            dispatch({type:'END_CHECKING'})
        }
    };


    const logout = () => {
        localStorage.clear()
        dispatch({ type: 'LOGOUT' })
    };

    const starChecking = async () => {
        dispatch({type:'START_CHECKING'})

        try {
            const { data } = await lacuentaApi.get(`/auth/me`)

            dispatch({
                type: 'LOGIN',
                payload: data.user
            })
            dispatch({type:'END_CHECKING'})


        } catch (error: any) {
            // console.log(error.response.data.msg)
            dispatch({ type: 'LOGOUT' })
            dispatch({type:'END_CHECKING'})

        }

    };



    return (
        <AuthContext.Provider value={{
            user,
            register,
            login,
            logout,
            starChecking
        }}>
            {children}
        </AuthContext.Provider>
    )
};