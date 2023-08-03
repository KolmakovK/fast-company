import React from 'react'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center m-3">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
