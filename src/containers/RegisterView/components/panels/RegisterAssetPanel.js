import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
import { withRouter }       from 'react-router-dom'

class RegisterAssetPanel extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.asset.transaction) {
      const { history } = this.props
      history.push('/assets')
    }
  }

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
              <span>MetaMask ID:</span>
              <span>{id}</span>
            </li>
            <li>
              <span>Unique Hash of Photo:</span>
              <span>{assetHash}</span>
            </li>
          </ul>
        </div>
      </div>)
  }
}

RegisterAssetPanel.propTypes = {
  account: PropTypes.object,
  asset: PropTypes.object,
  history: PropTypes.object.isRequired,
  isValid: PropTypes.func
}

function mapStateToProps(state) {
  return {
    account: state.account,
    asset: state.asset
  }
}

export default withRouter(connect(mapStateToProps)(RegisterAssetPanel))
