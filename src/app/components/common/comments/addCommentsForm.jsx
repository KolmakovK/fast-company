import React, { useState, useEffect } from 'react'
import Api from '../../../api'
import PropTypes from 'prop-types'

import SelectField from '../form/selectField'
import { validator } from '../../../utils/validator'
import TextAreaField from '../form/textAreaField'
const initialData = { userId: '', content: '' }

const AddCommentsForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData)
  const [users, setUsers] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    Api.users.fetchAll().then(setUsers)
  }, [])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    userId: {
      isRequired: { message: 'Выберите себя из списка' }
    },
    content: {
      isRequired: { message: 'Комментарий не может быть пустым' }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const clearForm = () => {
    setData(initialData)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      label: users[userId].name,
      value: users[userId]._id
    }))

  return (
    <div>
      <h2>New comment</h2>
      <form action="" onSubmit={handleSubmit}>
        <SelectField
          defaultOption="Выберите пользователя"
          options={arrayOfUsers}
          name="userId"
          onChange={handleChange}
          value={data.userId}
          error={errors.userId}
        />
        <TextAreaField
          value={data.content}
          onChange={handleChange}
          label="Сообщение"
          name="content"
          error={errors.content}
        />
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary me-md-2">Опубликовать</button>
        </div>
      </form>
    </div>
  )
}

AddCommentsForm.propTypes = { onSubmit: PropTypes.func }

export default AddCommentsForm
