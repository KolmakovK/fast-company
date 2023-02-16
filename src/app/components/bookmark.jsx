import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, onClick }) => {
  const style = status ? 'bi bi-bookmark-heart-fill' : 'bi bi-bookmark-heart'
  return (
    <button onClick={onClick}>
      <i className={style}></i>
    </button>
  )
}

BookMark.propTypes = {
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default BookMark
