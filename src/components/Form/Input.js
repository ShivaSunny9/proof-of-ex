import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { isEmail }          from 'validator'

/* component styles */
import { inputStyles } from './styles.scss'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  checkIfValid(type, value) {
    switch(type) {
    case 'email':
      return { type, valid: isEmail(value) }
    case 'text':
      return { type, valid: value.length > 0 }
    default:
      return false
    }
  }

  onChange=(evt) => {
    const value = evt.currentTarget.value
    const { type, isValid } = this.props

    this.setState({
      value: value
    }, () => {
      isValid(this.checkIfValid(type, value))
    })
  }

  onBlur=() => {
    console.log('on blur')
  }

  render(){
    const { value } = this.state
    const { type, placeholder, disabled, required } = this.props

    return (
      <div className={inputStyles}>
        <input
          type={type}
          required={required}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPress}
          disabled={disabled}
        />
      </div>
    )
  }
}

Input.PropTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isValid: PropTypes.func
}

export default Input
