import { useState } from "react"

const useForm = <T extends Object>(initialState: T) => {

  const [form, setValues] = useState(initialState)

  const reset = () => {
    setValues(initialState)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleEmpty = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setValues({
        ...form,
        [e.target.name]: 1
      })
    }
}

//   return [values, handleInputChange, handleEmpty,reset]
return{
    ...form,
    form,
    handleInputChange,
    reset,
    handleEmpty
}

}

export default useForm