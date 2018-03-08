import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { Form, Label, Input } from 'components/Form'

class CredentialsPanel extends Component {
  render() {
    const { id } = this.props.account

    return (
      <div>
        <h2>Enter Your Credentials</h2>
        <span>Your email address and public key will be registered on the Blockchain</span>
        <Form>
          <div className="form-section">
            <Label text="Your Email Address" />
            <Input
              type="email"
              autoFocus
              placeholder="your_email@email.com"
              checkIfValid={this.setValidStatus}
            />
          </div>
          <div className="form-section">
            <Label text="Your Account" />
            <Input
              type="text"
              disabled
              value={id}
            />
            <span className="input-hint">(from MetaMask)</span>
          </div>
        </Form>
      </div>
    )
  }

  setValidStatus=(input) => {
    const { isValid } = this.props

    if (input.valid) {
      isValid(true)
    }
  }
}

CredentialsPanel.propTypes = {
  account: PropTypes.object,
  isValid: PropTypes.func
}

function mapStateToProps(state) {
  return {
    account: state.account
  }
}

export default connect(mapStateToProps)(CredentialsPanel)
