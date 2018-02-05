import React, { Component } from 'react'
import PropTypes            from 'prop-types'

/* component styles */
import { inputStyles } from './styles.scss'

class Input extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { type, value, placeholder, disabled } = this.props
    return (
      <div className={inputStyles}>
        <input type={type} value={value} placeholder={placeholder} disabled={disabled} />
      </div>
    )
  }

}

Input.PropTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
}

export default Input
