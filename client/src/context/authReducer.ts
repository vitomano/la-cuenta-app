import { User } from "../interfaces/interfaces"


export interface AuthState {
    checking: boolean,
    logged: boolean,
    user: User | null
}

type ActionType = 
| {type: 'LOGIN', payload: User}
| {type: 'START_CHECKING'}
| {type: 'END_CHECKING'}
| {type: 'LOGOUT'}

export const authReducer = (state: AuthState, action: ActionType): AuthState => {
    switch (action.type) {

        case 'LOGIN':
            return {
                ...state, 
                checking: false,
                logged: true,
                user: action.payload
            }

        case 'LOGOUT':
            return {
                ...state, 
                checking: false,
                logged: false,
                user: null
            }

        case 'START_CHECKING':
            return {
                ...state, 
                checking: true,
            }

        case 'END_CHECKING':
            return {
                ...state, 
                checking: false,
            }

        default:
            return state
    }
}
