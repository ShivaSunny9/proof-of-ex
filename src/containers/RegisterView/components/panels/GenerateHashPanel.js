import React, { Component } from 'react'
import ProgressIndicator    from 'components/ProgressIndicator'
import { Link }             from 'react-router-dom'

class GenerateHashPanel extends Component {
  render() {
    const { alreadyExists, assetHash } = this.props
    let content

    if (alreadyExists) {
      content = (
        <div>
          <h2>Someone already registered this asset</h2>
          <span>A fingerprint for this asset already exists!</span>
          <Link to="/home">Upload a new photo</Link>
        </div>
      )
    } else if (assetHash) {
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
  alreadyExists: PropTypes.boolean,
  assetHash: PropTypes.string
}

export default GenerateHashPanel
