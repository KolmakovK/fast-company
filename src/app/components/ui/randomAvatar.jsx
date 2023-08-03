import React from 'react'
import PropTypes from 'prop-types'

const RandomAvatar = ({ size }) => {
  return (
    <img
      src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`}
      className="rounded-circle shadow-1-strong me-3"
      alt="avatar"
      width={size}
      height={size}
    />
  )
}

RandomAvatar.propTypes = { size: PropTypes.string }

export default RandomAvatar
