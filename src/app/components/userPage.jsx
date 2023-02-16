import React, { useEffect, useState } from 'react'
import Api from '../api'
import { useHistory, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import QualitiesList from './qualitiesList'

const UserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [user, setUser] = useState()
  useEffect(() => {
    Api.users.getById(userId).then((data) => setUser(data))
  }, [userId])
  const handleBackToUsersList = () => {
    history.push('/users')
  }

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <img
          src="https://avatars.mds.yandex.net/get-kino-vod-users-avatar/28790/2a0000017db5984479a2cb2587629dc1118f/120x190"
          alt="avatar"
        />
        <h2>{user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <h4>CompletedMeetings: {user.completedMeetings}</h4>
        <h2>Rate: {user.rate}/5</h2>
        <button onClick={handleBackToUsersList}>Все пользователи</button>
      </div>
    )
  } else {
    return <h2>Loading...</h2>
  }
}

UserPage.propTypes = { userId: PropTypes.string.isRequired }

export default UserPage
