import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ logged, children }: any) => {


  return logged
    ? children
    : <Navigate to="/login" />

}
