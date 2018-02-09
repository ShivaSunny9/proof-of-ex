import React, { Component }   from 'react';
import { Form, Label, Input } from 'components/Form'
import ProgressIndicator      from 'components/ProgressIndicator'

/* component styles */
import { styles } from '../styles.scss'

export default class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailValid     : false,
      publicKeyValid : false,
      disabled       : true,
      assetHash      : ''
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

    /* If the second panel is display, go ahead and create the 256-SHA hash of the asset*/
    if((nextProps.stepIndex !== this.props.stepIndex) && nextProps.stepIndex === 1) {
      assetDispatcher.createAssetHash()
    }

    if((nextProps.assetHash !== '') && (nextProps.stepIndex === 1)) {
      this.setState({ assetHash: nextProps.assetHash })
    }
  }

  getStepContent() {
    const { stepIndex } = this.props

    switch (stepIndex) {
    case 0:
      return (
        <div>
          <h2>Step 1 - Enter Your Credentials</h2>
          <span>Your email address and public key are registered on the Blockchain</span>
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
      const { assetHash } = this.state
      const heading = (<h2>Step 2 - Create A Unique Hash Of Your Asset</h2>)

      if(assetHash) {
        return (
          <div>
            {heading}
            <span>The SHA256 algorithm is used to establish a unique fingerprint of your asset</span>
            <div id="unique-hash">{assetHash}</div>
          </div>)
      } else {
        return (
          <div>
            {heading}
            <div id="hash-progress-indicator">
              <ProgressIndicator type="linear" />
              <span className="blink-me">Hold on, we're creating a unique hash of your asset...</span>
            </div>
          </div>)
      }
    }
    case 2:
      return (
        <div>
          <h2>Step 3 - Pay Gas & Confirm Transaction</h2>
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
