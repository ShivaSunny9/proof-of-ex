import React, { Component }   from 'react';
import { Form, Label, Input } from 'components/Form'
import ProgressIndicator      from 'components/ProgressIndicator'
import { getString }          from 'core/utils/util-assets'
import { withRouter, Link }   from 'react-router'
import CredentialsPanel       from './CredentialsPanel'

/* component styles */
import { styles } from '../styles.scss'

class PanelContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailValid        : false,
      email             : '',
      assetAlreadyExists: false,
      assetHash         : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { assetDispatcher } = this.props

    /*
      panel 0 = "Enter Credentials" panel
      panel 1 = "Generate Unique Hash" panel
      panel 2 = "Confirm Transaction" panel
    */

    if(nextProps.panel === 1) {
      if(nextProps.panel !== this.props.panel) {
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

    if(nextProps.panel === 2 && nextProps.asset.transaction) {
      const { history } = this.props
      history.push('/assets')
    }
  }



  checkIfAllowedToProceed=() => {
    const { continueToNextPanel, panel } = this.props
    const {
      emailValid,
      assetHash,
      assetAlreadyExists
    } = this.state

    switch(panel) {
    case 0:
      if(emailValid) { continueToNextPanel(true) }
      break
    case 1:
      if(assetAlreadyExists) {
        continueToNextPanel(false)
      } else if(assetHash) {
        continueToNextPanel(true) }
      break
    }

  }

  getPanelContent() {
    const { panel, provider } = this.props

    switch (panel) {
    case 0:
      return (<CredentialsPanel account={provider.account} />)
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
    case 2: {
      const { assetHash } = this.state
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
                <span>{provider.account}</span>
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

export default withRouter(PanelContainer)
