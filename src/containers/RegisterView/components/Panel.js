import React, { Component }   from 'react';
import { Form, Label, Input } from 'components/Form'

/* component styles */
import { styles } from '../styles.scss'

export default class Panel extends Component {
  constructor(props) {
    super(props)
  }

  getStepContent() {
    const { stepIndex } = this.props

    switch (stepIndex) {
    case 0:
      return (
        <div>
          <h2>Step 1 - Enter Your Credentials</h2>
          <span>Your email address and public key are registered on the Blockchain</span>
          <Form>
            <Label text="Your Email Address" />
            <Input type="text" />
            <Label text="Your Ethereum Wallet Address (Public Key)" />
            <Input type="text" />
          </Form>
        </div>)
    case 1:
      return (
        <div>
          <h2>Step 2 - Create A Unique Hash Of Your Asset</h2>
          <span>The SHA256 algorithm is used to create a unique fingerprint of your asset</span>
          <Form>
            <Label text="Your Asset's Unique Hash" />
            <Input type="text" value={"2sdlkjfghl345345lkjh"} disabled/>
          </Form>
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
    return (
      <div className={styles}>
        <div id="registration-form">
          {this.getStepContent()}
        </div>
      </div>
    )
  }
}
