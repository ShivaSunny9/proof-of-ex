import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { getString } from 'core/utils/util-assets'
import { withRouter } from 'react-router'
import CredentialsPanel     from './panels/CredentialsPanel'
import GenerateHashPanel    from './panels/GenerateHashPanel'
import RegisterAssetPanel   from './panels/RegisterAssetPanel'

/* component styles */
import { styles } from '../styles.scss'

class PanelContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailValid: false,
      email: '',
      assetAlreadyExists: false,
      assetHash: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { assetDispatcher } = this.props

    /*
      panel 0 = "Enter Credentials" panel
      panel 1 = "Generate Unique Hash" panel
      panel 2 = "Confirm Transaction" panel
    */

    if (nextProps.panel === 1) {
      if (nextProps.panel !== this.props.panel) {
        getString(nextProps.asset.stagedAsset, (assetUrl) => {
          assetDispatcher.checkIfAssetExists(assetUrl)
        })
      }

      if (nextProps.asset.alreadyExists) {
        this.setState({
          alreadyExists: true
        })
      } else if (nextProps.asset.assetHash) {
        setTimeout(() => {
          this.setState({
            assetHash: nextProps.asset.assetHash
          })
        }, 3000)
      }
    }

    if (nextProps.panel === 2 && nextProps.asset.transaction) {
      const { history } = this.props
      history.push('/assets')
    }
  }

  getPanelContent() {
    const { panel, account } = this.props
    const { alreadyExists, assetHash } = this.state

    switch (panel) {
    case 0:
      return (<CredentialsPanel account={account} />)
    case 1:
      return (<GenerateHashPanel alreadyExists={alreadyExists} assetHash={assetHash} />)
    case 2:
      return (<RegisterAssetPanel account={account} assetHash={assetHash} />)
    default:
      return
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

PanelContainer.propTypes = {
  asset: PropTypes.object.isRequired,
  account: PropTypes.string,
  assetDispatcher: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  panel: PropTypes.number.isRequired
}

export default withRouter(PanelContainer)
