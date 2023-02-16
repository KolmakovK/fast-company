import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'
import { validator } from '../utils/validator'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Электронная почта введена некорректно' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять хотя бы из 8 символов',
        value: 8
      }
    }
  }
  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0 || false
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        name={'email'}
        label={'Электронная почта'}
        type={'text'}
        value={data.email}
        error={errors.email}
      />
      <TextField
        onChange={handleChange}
        name={'password'}
        label={'Пароль'}
        type={'password'}
        value={data.password}
        error={errors.password}
      />
      <button type={'submit'}>Войти</button>
    </form>
  )
}

export default Login
