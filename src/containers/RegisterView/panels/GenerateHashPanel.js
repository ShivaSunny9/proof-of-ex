import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import ProgressIndicator      from 'components/ProgressIndicator'
import { Link }               from 'react-router-dom'
import { getString }          from 'core/utils/util-assets'
import Controls               from '../components/Controls'

import * as assetActionCreators from 'core/actions/actions-asset'

class GenerateHashPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextBtnDisabled: true
    }
  }

  componentDidMount() {
    const { actions, asset } = this.props

    getString(asset.stagedAsset, (assetUrl) => {
      setTimeout(() => {
        actions.asset.checkIfAssetExists(assetUrl)
      }, 2000)
    })
  }

  getControls = () => {
    const { nextBtnDisabled } = this.state
    return (<Controls nextDisabled={nextBtnDisabled} handleNext={this.proceed} />)
  }

  render() {
    const { asset } = this.props
    const { alreadyExists, assetHash, error } = asset
    let content

    if (alreadyExists) {
      content = (
        <div id="already-exists-message">
          <h2>Someone already registered this asset!</h2>
          <span><Link to="/home">Upload a new photo</Link></span>
        </div>
      )
    } else if (assetHash) {
      content = (
        <div>
          <h2>Unique hash (SHA-256) of your photo asset</h2>
          <span>Click Next to register your asset</span>
          <div id="unique-hash">{assetHash}</div>
        </div>
      )
    } else if (error) {
      content = (
        <div id="error-message">
          <h2>Sorry, there's an error!</h2>
          <span>{error} - <Link to="/home"> Please try again</Link></span>
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

    return (
      <div>
        {content}
        {this.getControls()}
      </div>
    )
  }

  proceed = () => {

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
