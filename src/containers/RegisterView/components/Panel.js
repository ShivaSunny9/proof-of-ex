import React, { Component }   from 'react';
import { Form, Label, Input } from 'components/Form'
import ProgressIndicator      from 'components/ProgressIndicator'
import { getString }          from 'core/utils/util-assets'
import Link                   from 'react-router'

/* component styles */
import { styles } from '../styles.scss'

export default class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailValid        : false,
      publicKeyValid    : false,
      assetAlreadyExists: false,
      assetHash         : ''
    }
  }

  checkIfInputValid=(input) => {
    switch(input.type) {
    case 'email':
      if(input.valid) { this.setState({ emailValid: true}) }
      break
    case 'text':
      if(input.valid) { this.setState({ publicKeyValid: true}) }
      break
    }

    this.checkIfAllowedToProceed()
  }

  checkIfAllowedToProceed=() => {
    const { allowToProceed, stepIndex } = this.props
    const {
      emailValid,
      publicKeyValid,
      assetHash,
      assetAlreadyExists
    } = this.state

    switch(stepIndex) {
    case 0:
      if(emailValid && publicKeyValid) { allowToProceed(true) }
      break
    case 1:
      if(assetAlreadyExists) { allowToProceed(false)
      } else if(assetHash) { allowToProceed(true) }
      break
    }

  }

  componentWillReceiveProps(nextProps) {
    const { assetDispatcher } = this.props

    /*
      stepIndex 0 = "Enter Credentials" panel
      stepIndex 1 = "Generate Unique Hash" panel
      stepIndex 2 = "Confirm Transaction" panel
    */

    if(nextProps.stepIndex === 1) {
      if(nextProps.stepIndex !== this.props.stepIndex) {
        getString(nextProps.asset.stagedAsset, (assetUrl) => {
          assetDispatcher.checkIfAssetExists(assetUrl);
        })
      }

      if(nextProps.asset.alreadyExists) {
        this.setState({
          alreadyExists: true
        }, () => { this.checkIfAllowedToProceed() })

      } else if(nextProps.asset.assetHash) {

        setTimeout(() => {
          this.setState({
            assetHash: nextProps.asset.assetHash
          }, () => { this.checkIfAllowedToProceed() })
        }, 3000)
      }
    }
  }

  getPanelContent() {
    const { stepIndex } = this.props

    switch (stepIndex) {
    case 0:
      return (
        <div>
          <h2>Enter Your Credentials</h2>
          <span>Your email address and public key will be registered on the Blockchain</span>
          <Form>
            <Label text="Your Email Address" />
            <Input
              type="email"
              required={true}
              placeholder="yourname@email.com"
              isValid={this.checkIfInputValid}
            />
            <Label text="Your Ethereum Wallet Address (Public Key)" />
            <Input
              type="text"
              required={true}
              isValid={this.checkIfInputValid}
            />
          </Form>
        </div>)
    case 1: {
      const { alreadyExists, assetHash } = this.state

      if(alreadyExists) {
        return (
          <div>
            <h2>Someone already registered this asset</h2>
            <span>A fingerprint for this asset already exists!</span>
            <Link to="/home">Upload a new photo</Link>
          </div>)
      } else if (assetHash) {
        return (
          <div>
            <h2>Unique hash of your photo asset</h2>
            <span>Click 'Next' to register your asset</span>
            <div id="unique-hash">{assetHash}</div>
          </div>
        )
      } else {
        return (
          <div>
            <h2>Generating a unique hash of your asset...</h2>
            <div id="hash-progress-indicator">
              <ProgressIndicator type="linear" />
              <span className="blink-me">Please hold on...</span>
            </div>
          </div>)
      }
    }
    case 2:
      return (
        <div>
          <h2>Confirm Transaction</h2>
          <span>Summary of your order</span>
          <div id="registration-details">
            <ul>
              <li>
                <span>Your Email:</span>
                <span>mark.muskardin@gmail.com</span>
              </li>
              <li>
                <span>Your Public Key:</span>
                <span>user_public_key_goes_here</span>
              </li>
              <li>
                <span>Unique Hash:</span>
                <span>8365df4d4f0e798736c4102c4569c5f94541169f5268fbaa7c17f222b29a3e0c</span>
              </li>
              <li>
                <span>Gas:</span>
                <span>255555 ETH</span>
              </li>
            </ul>
          </div>
        </div>)
    }
  }

  render() {

    return (
      <div className={styles}>
        <div id="registration-form">
          {this.getPanelContent()}
        </div>
      </div>
    )
  }
}
