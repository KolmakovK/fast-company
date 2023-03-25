import React, { useEffect, useState } from 'react'
import Api from '../../../api'
import { useHistory, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import Qualities from '../../ui/qualities'

const UserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [user, setUser] = useState()
  useEffect(() => {
    Api.users.getById(userId).then((data) => setUser(data))
  }, [])
  const handleBackToUsersList = () => {
    history.push(`/users/:${userId}/edit`)
  }

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <img
          src="https://avatars.mds.yandex.net/get-kino-vod-users-avatar/28790/2a0000017db5984479a2cb2587629dc1118f/120x190"
          alt="avatar"
        />
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>CompletedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}/5</h2>
        <button onClick={handleBackToUsersList}>Изменить</button>
      </div>
    )
  } else {
    return <h2>Loading... </h2>
  }
}

UserPage.propTypes = { userId: PropTypes.string.isRequired }

export default UserPage
