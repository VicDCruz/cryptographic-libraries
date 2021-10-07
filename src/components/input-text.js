import React from 'react'
import PropTypes from 'prop-types'

const InputText = ({
  name = '',
  id = '',
  label = '',
  value = null,
  onChange = false,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className={disabled ? 'opacity-50' : ''}>{label}</span>
      <input type="text" name={name} id={id} disabled={disabled} { ...(onChange ? { value, onChange } : {})} />
    </div>
  )
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  disabled: PropTypes.bool,
}

export default InputText
