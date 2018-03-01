import React, { Component }         from 'react'
import { connect }                  from 'react-redux'
import { bindActionCreators }       from 'redux'
import { withRouter }               from 'react-router-dom'
import Photo                        from './components/Photo'
import Panel                        from './components/Panel'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import Button                       from 'components/Button'

/* component styles */
import { styles } from './styles.scss'

import * as assetActionCreators from 'core/actions/actions-asset'

class RegisterView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0,
      disabled: true
    }
  }

  showPanel = (callback) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(callback, 10)
    })
  }

  handleNext = () => {
    const { asset } = this.props
    const { stepIndex } = this.state


    if(stepIndex === 2) { /* stepIndex 2 is the final screen */
      const { actions } = this.props
      actions.asset.createAssetHash()
      
    } else if (!this.state.loading && asset.stagedAsset) {
      this.showPanel(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      }, () => {
        if(stepIndex === 1) { this.setState({ disabled: false }) }
      }))

      this.setState({ disabled: true })
    }

  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (!this.state.loading) {
      this.showPanel(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1
      }))
    }
  }

  checkAllowToProceed=(allowed) => {
    const { asset } = this.props

    if(allowed && asset.stagedAsset) {
      this.setState({ disabled: false })
    }
  }

  renderContent() {
    const { finished, stepIndex } = this.state
    const { asset, actions } = this.props
    const assetDispatcher = actions.asset

    if (finished) { return (<div>Success!</div>) }

    return (
      <Panel
        stepIndex={stepIndex}
        allowToProceed={this.checkAllowToProceed}
        asset={asset}
        assetDispatcher={assetDispatcher}
      />)
  }

  render() {
    const { stepIndex, disabled } = this.state
    const { asset } = this.props

    return (
      <div className={styles}>
        <div id="register-view">
          <Photo asset={asset} />
          <div id="registration-form-container">
            <Stepper activeStep={stepIndex}>
              <Step><StepLabel>Enter Credentials</StepLabel></Step>
              <Step><StepLabel>Generate Unique Hash</StepLabel></Step>
              <Step><StepLabel>Pay Gas & Register</StepLabel></Step>
            </Stepper>
            {this.renderContent()}
            <div id="button-controls">
              <Button
                type="raised"
                label={stepIndex === 2 ? 'Pay Gas & Register' : 'Next'}
                primary={true}
                disabled={disabled}
                onClick={this.handleNext}
              />
              <Button
                type="flat"
                label="Back"
                secondary={true}
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterView))
