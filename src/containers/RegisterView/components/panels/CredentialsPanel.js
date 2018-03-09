import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { Form, Label, Input } from 'components/Form'

import * as accountActionCreators from 'core/actions/actions-account'

class CredentialsPanel extends Component {
  render() {
    const { id } = this.props.account

    return (
      <div>
        <h2>Enter Your Credentials</h2>
        <span>Your email address and account ID will be registered on the Blockchain</span>
        <Form>
          <div className="form-section">
            <Label text="Your Email Address" />
            <Input
              type="email"
              autoFocus
              placeholder="your_email@email.com"
              checkIfValid={this.setEmail}
            />
          </div>
          <div className="form-section">
            <Label text="Your Account ID (from MetaMask)" />
            <Input
              type="text"
              disabled
              value={id}
            />
          </div>
        </Form>
      </div>
    )
  }

  setEmail=(input) => {
    const { actions } = this.props
    if (input.valid && input.type === 'email') {
      actions.account.setEmail(input.value)
    }
  }
}

CredentialsPanel.propTypes = {
  account: PropTypes.object,
  actions: PropTypes.object
}

function mapStateToProps(state) {
  return {
    account: state.account
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      account: bindActionCreators(accountActionCreators, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentialsPanel)
