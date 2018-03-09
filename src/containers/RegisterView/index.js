import React, { Component }         from 'react'
import PropTypes                    from 'prop-types'
import { connect }                  from 'react-redux'
import { bindActionCreators }       from 'redux'
import Photo                        from './components/Photo'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import Button                       from 'components/Button'
import CredentialsPanel             from './components/panels/CredentialsPanel'
import GenerateHashPanel            from './components/panels/GenerateHashPanel'
import RegisterAssetPanel           from './components/panels/RegisterAssetPanel'

/* component styles */
import { styles } from './styles.scss'

import * as accountActionCreators from 'core/actions/actions-account'
import * as assetActionCreators   from 'core/actions/actions-asset'

class RegisterView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      email: '',
      finished: false,
      panel: 0
    }
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.asset.clear()
  }

  renderContent() {
    const { panel } = this.state

    switch (panel) {
    case 0:
      return (<CredentialsPanel   />)
    case 1:
      return (<GenerateHashPanel  />)
    case 2:
      return (<RegisterAssetPanel />)
    default:
      break
    }
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
            <div id="registration-form">{this.renderContent()}</div>
            <div id="button-controls">
              <Button
                type="raised"
                label={panel === 2 ? 'Register Asset' : 'Next'}
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
    const { actions } = this.props
    const { panel } = this.state

    switch (panel) {
    case 0:
      break
    case 1:
      break
    case 2:
      actions.asset.createAssetHash()
      break
    default:
      break
    }

    this.setState({
      panel: (panel === 2) ? 2 : panel + 1,
      finished: panel === 2,
      disabled: true
    })
  }

  handlePrev = () => {
    const { panel } = this.state
    this.setState({ panel: panel - 1 })
  }

}

RegisterView.propTypes = {
  asset: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    asset: state.asset
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      account: bindActionCreators(accountActionCreators, dispatch),
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView)
