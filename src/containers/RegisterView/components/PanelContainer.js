import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { getString } from 'core/utils/util-assets'


/* component styles */
import { styles } from '../styles.scss'

class PanelContainer extends Component {

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


  render() {
    return (
      <div className={styles}>
        <div id="registration-form" />
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
