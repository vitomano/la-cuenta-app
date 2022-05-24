import React, { useContext } from 'react'

import toast from 'react-hot-toast';

import useForm from '../../hooks/useForm';
import useEmail from '../../hooks/useEmail';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Register = () => {

  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const { email, password, name, handleInputChange } = useForm({
    name: 'Ignacio Astudillo',
    email: "ignacio@gmail.com",
    password: "123456"
  })

  const { ok, msg } = useEmail(email)

  const userRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!ok) return toast.error(msg)
    if(password.length < 6) return toast.error('La contraseña debe contener al menos 6 caracteres')

    register({ name, email, password, rol:"USER_ROLE" })
  }


  return (
      <div>
        <form onSubmit={(e) => userRegister(e)}>
          <h1 className="mb-2"> Register </h1>
          <div className="mb-2">
            <input
              type="text"
              name="name"
              placeholder="email"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
          >
            Register
          </button>

          
        </form>

        <button
            onClick={() => navigate('/login')}
          >
            Volver a Login
          </button>
      </div>
  )
}
