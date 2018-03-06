import React, { Component }from 'react'
import { connect }from 'react-redux'
import { bindActionCreators }from 'redux'
import { withRouter }from 'react-router-dom'
import Photo                        from './components/Photo'
import PanelContainer               from './components/PanelContainer'
import { Step, Stepper, StepLabel }from 'material-ui/Stepper'
import Button                       from 'components/Button'

/* component styles */
import { styles }from './styles.scss'

import * as assetActionCreators from 'core/actions/actions-asset'

class RegisterView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      panel: 0,
      disabled: true
    }
  }

  renderContent() {
    const { finished, panel } = this.state
    const { asset, provider, actions } = this.props
    const assetDispatcher = actions.asset

    if (finished) { return (<div>Success!</div>) }

    return (
      <PanelContainer
        panel={panel}
        asset={asset}
        account={provider.account}
        assetDispatcher={assetDispatcher}
      />)
  }

  render() {
    const { panel, disabled } = this.state
    const { asset } = this.props

    return (
      <div className={styles}>
        <div id="register-view">
          <Photo asset={asset} />
          <div id="registration-form-container">
            <Stepper activeStep={panel}>
              <Step><StepLabel>Enter Credentials</StepLabel></Step>
              <Step><StepLabel>Generate Unique Hash</StepLabel></Step>
              <Step><StepLabel>Register</StepLabel></Step>
            </Stepper>
            {this.renderContent()}
            <div id="button-controls">
              <Button
                type="raised"
                label={panel === 2 ? 'Register' : 'Next'}
                primary
                disabled={disabled}
                onClick={this.handleNext}
              />
              <Button
                type="flat"
                label="Back"
                secondary
                disabled={panel === 0}
                onClick={this.handlePrev}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleNext = () => {
    const { asset } = this.props
    const { panel } = this.state

    if (panel === 2) { /* panel 2 is the final screen */
      const { actions } = this.props
      actions.asset.createAssetHash()
    } else if (asset.stagedAsset) {
      this.setState({
        panel: panel + 1,
        finished: panel === 2,
        disabled: true
      }, () => {
        if (panel === 1) { this.setState({ disabled: false }) }
      })
    }
  }

  handlePrev = () => {
    const { panel } = this.state
    this.setState({ panel: panel - 1 })
  }

}

RegisterView.propTypes = {
  asset: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    asset: state.asset,
    provider: state.provider
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: {
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterView))
