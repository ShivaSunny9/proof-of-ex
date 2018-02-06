import React, { Component }         from 'react';
import { connect }                  from 'react-redux'
import { bindActionCreators }       from 'redux'
import { withRouter }               from 'react-router-dom'
import Photo                        from './components/Photo'
import Panel                        from './components/Panel'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

/* component styles */
import { styles } from './styles.scss'

import * as assetActionCreators from 'core/actions/actions-asset'

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0
    }
  }

  showPanel = (callback) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(callback, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.showPanel(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      }));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.showPanel(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1
      }));
    }
  };

  renderContent() {
    const { finished, stepIndex } = this.state;

    if (finished) { return (<div>Success!</div>) }
    return (<Panel stepIndex={stepIndex} />)
  }

  render() {
    const { stepIndex } = this.state
    const { asset } = this.props

    return (
      <div className={styles}> 
        <div id="register-view">   
          <Photo asset={asset} />  
          <div id="registration-form-container">
            <Stepper activeStep={stepIndex}>
              <Step><StepLabel>Enter your credentials</StepLabel></Step>
              <Step><StepLabel>Generate a unique hash</StepLabel></Step>
              <Step><StepLabel>Pay Gas & Confirm</StepLabel></Step>
            </Stepper>
            {this.renderContent()}
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
