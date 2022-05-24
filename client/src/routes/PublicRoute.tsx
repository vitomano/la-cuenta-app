import { Navigate } from 'react-router-dom'


export const PublicRoute = ({ logged, children }: any) => {

  return logged
  ? <Navigate to="/"/>
  : children
  
}
