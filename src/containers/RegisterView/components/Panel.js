import React, { Component }   from 'react';
import { Form, Label, Input } from 'components/Form'
import Button                 from 'components/Button'

/* component styles */
import { styles } from '../styles.scss'

export default class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailValid     : false,
      publicKeyValid : false,
      disabled       : true
    }
  }

  checkIfValid=(input) => {
    const { emailValid, publicKeyValid } = this.state

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
      this.setState({ disabled: false })
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
    case 1:
      return (
        <div>
          <h2>Step 2 - Create A Unique Hash Of Your Asset</h2>
          <span>The SHA256 algorithm is used to create a unique fingerprint of your asset</span>
          <div id="unique-hash">2sdlkjfghl345345lkjh</div>
        </div>)
    case 2:
      return (
        <div>
          <h2>Step 3 - Pay Gas & Confirm Transaction</h2>
          <span>You need to pay gas in Ether in order to create a record on the Blockchain</span>
          <Form>
            <Label text="Estimated Gas" />
            <Input type="text" value={123123123} disabled/>
          </Form>
        </div>)
    }
  }

  render() {
    const { disabled } = this.state
    const { stepIndex } = this.props

    return (
      <div className={styles}>
        <div id="registration-form">
          {this.getStepContent()}
          <div id="button-controls">
            <Button
              type="raised"
              label={stepIndex === 2 ? 'Pay & Confirm' : 'Next'}
              primary={true}
              disabled={disabled}
              onClick={this.handleNext}
            />
            <Button
              type="flat"
              label="Back"
              secondary={true}
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
            />
          </div>
        </div>
      </div>
    )
  }
}
