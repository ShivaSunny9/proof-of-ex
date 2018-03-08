import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'

class GenerateHashPanel extends Component {
  render() {
    const { id, email } = this.props.account
    const { isValid } = this.props
    const { assetHash } = this.props.asset

    isValid(true)

    return (
      <div>
        <h2>Confirm Transaction</h2>
        <span>Summary of your information</span>
        <div id="registration-details">
          <ul>
            <li>
              <span>Your Email:</span>
              <span>{email}</span>
            </li>
            <li>
              <span>Your Public Key:</span>
              <span>{id}</span>
            </li>
            <li>
              <span>Unique Hash:</span>
              <span>{assetHash}</span>
            </li>
          </ul>
        </div>
      </div>)
  }
}

GenerateHashPanel.propTypes = {
  account: PropTypes.object,
  asset: PropTypes.object,
  isValid: PropTypes.func
}

function mapStateToProps(state) {
  return {
    account: state.account,
    asset: state.asset
  }
}

export default connect(mapStateToProps)(GenerateHashPanel)
