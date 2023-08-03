import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = ({ value, onChange, name, label, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        id={name}
        className={getInputClasses()}
        rows="3"
        name={name}
        value={value}
        onChange={handleChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextAreaField.defaultProps = { type: 'text' }

TextAreaField.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.object
}

export default TextAreaField
