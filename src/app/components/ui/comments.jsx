import React, { useState, useEffect } from 'react'
import Api from '../../api'
import PropTypes from 'prop-types'

import AddCommentsForm from '../common/comments/addCommentsForm'
import CommentsList from '../common/comments/commentsList'
import { orderBy } from 'lodash'

const Comments = ({ userId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    Api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data)
    })
  }, [])

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  const handleDeleteComment = (id) => {
    Api.comments.remove(id).then((id) => {
      setComments(comments.filter((i) => i._id !== id))
    })
  }
  const handleSubmit = (data) => {
    console.log(data)
    Api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]))
  }
  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentsForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onDelete={handleDeleteComment}
            />
          </div>
        </div>
      )}
    </>
  )
}

Comments.propTypes = { userId: PropTypes.string }

export default Comments
