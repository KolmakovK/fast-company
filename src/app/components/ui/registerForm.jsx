import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import Api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelect'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })
  const [qualities, setQualities] = useState({})
  const [professions, setProfessions] = useState([])
  const [errors, setErrors] = useState({})
  useEffect(() => {
    Api.professions.fetchAll().then((data) => setProfessions(data))
    Api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])
  const handleChange = (target) => {
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
    },
    profession: {
      isRequired: { message: 'Обязательно выберите ваше профессию' }
    },
    license: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без принятия лицензионного соглашения'
      }
    }
  }
  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

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
      <SelectField
        onChange={handleChange}
        options={professions}
        defaultOption={'Choose...'}
        value={data.profession}
        error={errors.profession}
        label="Выберите вашу профессию"
      />
      <RadioField
        options={[
          {
            name: 'Male',
            value: 'male'
          },
          {
            name: 'Female',
            value: 'female'
          },
          {
            name: 'Other',
            value: 'other'
          }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Выберите ваши качества"
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type={'submit'}
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  )
}
export default RegisterForm
