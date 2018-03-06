import React, { Component }   from 'react'
import { Form, Label, Input } from 'components/Form'

/* component styles */
import { styles } from '../styles.scss'

export default class CredentialsPanel extends Component {
  setValidStatus=(input) => {
    if(input.valid) {
      //allow form to proceed here
    }
  }

  render() {
    const { account } = this.props
    return (
      <div className={styles}>
        <div>
          <h2>Enter Your Credentials</h2>
          <span>Your email address and public key will be registered on the Blockchain</span>
          <Form>
            <div className="form-section">
              <Label text="Your Email Address" />
              <Input
                type="email"
                autoFocus={true}
                placeholder="your_email@email.com"
                checkIfValid={this.setValidStatus}
              />
            </div>
            <div className="form-section">
              <Label text="Your Account" />
              <Input
                type="text"
                disabled={true}
                value={account}
              />
              <span className="input-hint">(from MetaMask)</span>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

