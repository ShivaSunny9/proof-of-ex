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
      disabled          : true,
      assetAlreadyExists: false,
      assetHash         : ''
    }
  }

  checkIfValid=(input) => {
    const { emailValid, publicKeyValid } = this.state
    const { allowToProceed } = this.props

    switch(input.type) {
    case 'email':
      if(input.valid) {
        this.setState({ emailValid: true})
      }
      break
    case 'text':
      if(input.valid) {
        this.setState({ publicKeyValid: true})
      }
      break
    }

    if(emailValid && publicKeyValid) {
      allowToProceed(true)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { assetDispatcher } = this.props

    if(nextProps.stepIndex === 1) { /* If you're on the 2nd panel */
      if(nextProps.stepIndex !== this.props.stepIndex) {
        getString(nextProps.asset.stagedAsset, (assetUrl) => {
          assetDispatcher.checkIfAssetExists(assetUrl);
        })
      }

      if(nextProps.asset.alreadyExists) {
        this.setState({ alreadyExists: true })
      } else {
        setTimeout(() => {
          this.setState({ assetHash: nextProps.asset.assetHash})
        }, 3000)

      }
    }

    // if(nextProps.setIndex === 2) /* If you're on the 3rd panel */
    //   getString(nextProps.asset.stagedAsset, (assetUrl) => {
    //     // assetDispatcher.createAssetHash(assetUrl)
    //   })
    // }
  }

  getStepContent() {
    const { stepIndex } = this.props

    switch (stepIndex) {
    case 0:
      return (
        <div>
          <h2>Enter Your Credentials</h2>
          <span>Your email address and public key will be registered on the Blockchain</span>
          <Form onChange={this.onChange}>
            <Label text="Your Email Address" />
            <Input
              type="email"
              required={true}
              placeholder="yourname@email.com"
              isValid={this.checkIfValid}
            />
            <Label text="Your Ethereum Wallet Address (Public Key)" />
            <Input
              type="text"
              required={true}
              isValid={this.checkIfValid}
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
            <h2>This Hash is unique.  Click Next to register.</h2>
            <div id="unique-hash">{assetHash}</div>
          </div>
        )
      } else {
        return (
          <div>
            <h2>Checking if hash already exists</h2>
            <div id="hash-progress-indicator">
              <ProgressIndicator type="linear" />
              <span className="blink-me">Hold on, we're checking...</span>
            </div>
          </div>)
      }
    }
    case 2:
      return (
        <div>
          <h2>Pay Gas & Confirm Transaction</h2>
          <span>You need to pay gas in Ether in order to create a record on the Blockchain</span>
          <ul>
            <li>Your Email: mark.muskardin@gmail.com</li>
            <li>Hash of asset: e5sb536c0307bbs22sd423334545345ee</li>
            <li>Gas: 255555 ethere</li>
          </ul>
        </div>)
    }
  }

  render() {
    return (
      <div className={styles}>
        <div id="registration-form">
          {this.getStepContent()}
        </div>
      </div>
    )
  }
}
