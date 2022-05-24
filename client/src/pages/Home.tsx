import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Home = () => {

  const { logout } = useContext(AuthContext)

  return (
    <>
      <div>Home</div>
      <button onClick={logout}>
        logout
      </button>
    </>
  )
}
