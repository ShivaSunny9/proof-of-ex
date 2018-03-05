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

  componentDidMount() {
    const { value, autoFocus } = this.props
    if(value){ this.setState({ value: value }) }
    if(autoFocus) { this.input.focus() }
  }

  checkIfValid(type, value) {
    switch(type) {
    case 'email':
      return { type, valid: isEmail(value), value: value }
    case 'text':
      return { type, valid: value.length > 0, value: value }
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
      if(isValid) {
        isValid(this.checkIfValid(type, value))
      }
    })
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
          ref={(input) => { this.input = input }}
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
