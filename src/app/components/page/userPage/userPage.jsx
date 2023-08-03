import React, { useEffect, useState } from 'react'
import Api from '../../../api'
import PropTypes from 'prop-types'

import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import Comments from '../../ui/comments'
import Loading from '../../common/loading'

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    Api.users.getById(userId).then((data) => setUser(data))
  }, [])

  if (user) {
    return (
      <>
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user} />
              <QualitiesCard data={user.qualities} />
              <MeetingsCard value={user.completedMeetings} />
            </div>

            <div className="col-md-8">
              <Comments userId={userId} />
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <Loading />
  }
}

UserPage.propTypes = { userId: PropTypes.string }

export default UserPage
