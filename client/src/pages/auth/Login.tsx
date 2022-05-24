import React, { useContext } from 'react'

import toast from 'react-hot-toast';

import useForm from '../../hooks/useForm';
import useEmail from '../../hooks/useEmail';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const { email, password, handleInputChange } = useForm({
    email: "gustavo@gmail.com",
    password: "123456"
  })

  const { ok, msg } = useEmail(email)

  const userLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!ok) return toast.error(msg)

    login({ email, password })
  }


  return (
      <div>
        <form onSubmit={(e) => userLogin(e)}>
          <h1 className="mb-2"> Login </h1>
          <div className="mb-2">
            <input
              type="email"
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
            Login
          </button>
        </form>

        <button
            onClick={() => navigate('/register')}
          >
            Regístrate
          </button>
      </div>
  )
}
