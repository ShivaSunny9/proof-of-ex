import React, { Component } from 'react'

export default class GenerateHashPanel extends Component {
  render() {
    const { account, assetHash } = this.props

    return (
      <div>
        <h2>Confirm Transaction</h2>
        <span>Summary of your order</span>
        <div id="registration-details">
          <ul>
            <li>
              <span>Your Email:</span>
              <span>EMAIL GOES HERE</span>
            </li>
            <li>
              <span>Your Public Key:</span>
              <span>{account}</span>
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
