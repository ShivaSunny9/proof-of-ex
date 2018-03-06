import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import ProgressIndicator      from 'components/ProgressIndicator'
import { Link }               from 'react-router-dom'
import { getString }          from 'core/utils/util-assets'

import * as assetActionCreators from 'core/actions/actions-asset'

class GenerateHashPanel extends Component {
  componentDidMount() {
    const { actions, asset } = this.props

    getString(asset.stagedAsset, (assetUrl) => {
      actions.asset.checkIfAssetExists(assetUrl)
    })
  }

  render() {
    const { asset } = this.props
    let content

    if (asset.alreadyExists) {
      content = (
        <div>
          <h2>Someone already registered this asset</h2>
          <span>A fingerprint for this asset already exists!</span>
          <Link to="/home">Upload a new photo</Link>
        </div>
      )
    } else if (asset.assetHash) {
      content = (
        <div>
          <h2>Unique hash (SHA-256) of your photo asset</h2>
          <span>Click 'Next' to register your asset</span>
          <div id="unique-hash">{assetHash}</div>
        </div>
      )
    } else {
      content = (
        <div>
          <h2>Generating a unique hash of your asset...</h2>
          <div id="hash-progress-indicator">
            <ProgressIndicator type="linear" />
            <span className="blink-me">Please hold on...</span>
          </div>
        </div>
      )
    }

    return content
  }
}

GenerateHashPanel.propTypes = {
  actions: PropTypes.object.isRequired,
  alreadyExists: PropTypes.bool,
  asset: PropTypes.object
}

function mapStateToProps(state) {
  return {
    asset: state.asset
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateHashPanel)
