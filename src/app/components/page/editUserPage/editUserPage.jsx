import React, { useEffect, useState } from 'react'
import Api from '../../../api'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import { useHistory, useParams } from 'react-router-dom'

const EditUserPage = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  })
  const [qualities, setQualities] = useState([])
  const [professions, setProfessions] = useState([])
  const [errors, setErrors] = useState({})

  const { userId } = useParams()
  const history = useHistory()
  const [setUser] = useState()
  useEffect(() => {
    Api.users.getById(userId).then((data) => setUser(data))
  }, [userId])
  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return {
          _id: prof.value,
          name: prof.label
        }
      }
    }
  }
  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  useEffect(() => {
    Api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionsList)
    })
    Api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const handleBackToUsersList = () => {
    history.push('/users/:userId')
  }
  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Электронная почта введена некорректно' }
    },
    profession: {
      isRequired: { message: 'Обязательно выберите ваше профессию' }
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
    console.log({
      ...data,
      profession: getProfessionById(professions),
      qualities: getQualities(qualities)
    })
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              name={'name'}
              label={'Имя'}
              type={'text'}
              value={data.name}
            />
            <TextField
              onChange={handleChange}
              name={'email'}
              label={'Электронная почта'}
              type={'text'}
              value={data.email}
              error={errors.email}
            />
            <SelectField
              label="Выбери свою профессию"
              defaultOption="Choose..."
              options={professions}
              name="profession"
              onChange={handleChange}
              value={data.profession}
              error={errors.profession}
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
              defaultValue={data.qualities}
              name="qualities"
              label="Выберите ваши качества"
            />
            <button
              type={'submit'}
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
              onClick={handleBackToUsersList}
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
