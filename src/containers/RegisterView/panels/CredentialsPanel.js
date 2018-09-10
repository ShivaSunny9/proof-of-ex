import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter }         from 'react-router-dom'
import { Form, Label, Input } from 'components/Form'
import Controls               from '../components/Controls'
import Modal                  from 'components/modal'
import * as uiActionCreators  from 'core/actions/actions-ui'

import * as accountActionCreators from 'core/actions/actions-account'

class CredentialsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allowToProceed: false,
      email: '',
      nextBtnDisabled: true
    }
  }

  componentDidMount() {
    // const { actions } = this.props
    // actions.account.getMetaMaskId()
  }

  onEnter = (evt) => {
    if (evt.key === 'Enter') {
      const { allowToProceed } = this.state
      if (allowToProceed) { this.proceed() }
    }
  }

  render() {
    const { ui } = this.props
    const { email } = this.props.account
    const { nextBtnDisabled } = this.state

    return (
      <div>
        <h2>Enter Your Credentials</h2>
        <span>Your email address and account ID will be registered on the Blockchain</span>
        <Form>
          <div className="form-section">
            <Label text="Your email address"/>
            <Input
              type="email"
              value={email}
              autoFocus
              onKeyPress={this.onEnter}
              checkIfValid={this.enableNext}
            />
          </div>
          {this.displayMetaMaskInput()}
        </Form>
        <Controls
          prevDisabled
          nextDisabled={nextBtnDisabled}
          handleNext={this.proceed}
        />
        <Modal
          modalKey="sign-into-metamask-modal"
          modalState={ui.modalState}
          title="Your need to sign into MetaMask!"
        >
          <div>
            Please sign into MetaMask to proceed.
            <br />
            Then we'll automatically get your public key from MetaMask.
          </div>
        </Modal>
      </div>
    )
  }

  displayMetaMaskInput=() => {
    const { actions } = this.props
    const { id } = this.props.account

    if (id) {
      return (
        <div className="form-section">
          <Label text="Your Account ID (from MetaMask)" />
          <Input
            type="text"
            disabled
            value={id}
          />
        </div>
      )
    }

    actions.ui.showModal({modalKey: 'sign-into-metamask-modal'})
  }

  proceed = () => {
    const { actions, history } = this.props
    const { email } = this.state

    actions.account.setEmail(email)
    history.push('/register?panel=2')
  }

  enableNext=(input) => {
    const { asset } = this.props

    if (input.valid && asset.stagedAsset) {
      this.setState({
        allowToProceed: true,
        email: input.value,
        nextBtnDisabled: false
      })
    }
  }
}

CredentialsPanel.propTypes = {
  account: PropTypes.object,
  actions: PropTypes.object,
  asset: PropTypes.object,
  history: PropTypes.object,
  ui: PropTypes.object
}

function mapStateToProps(state) {
  return {
    account: state.account,
    asset: state.asset,
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      account: bindActionCreators(accountActionCreators, dispatch),
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CredentialsPanel))
