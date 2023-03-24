import React from 'react'
import { useParams } from 'react-router-dom'
import UsersListPage from '../components/page/usersListPage'

const Users = () => {
  const params = useParams()
  const { userId } = params
  console.log(userId)
  return <UsersListPage />
}

export default Users
