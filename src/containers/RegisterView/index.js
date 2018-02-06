import React, { Component }    from 'react';
import { connect }             from 'react-redux'
import { bindActionCreators }  from 'redux'
import { withRouter }          from 'react-router-dom'
import { Paper }               from 'material-ui'
import { Form, Label, Input }  from 'components/Form'
import Button                  from 'components/Button'
import imagePlaceholderSvg     from 'assets/images/image-placeholder.svg' 
import ProgressIndicator       from 'components/ProgressIndicator'
import getStyles               from 'core/utils/util-styles'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper';

/* component styles */
import { styles } from './styles.scss'

import * as assetActionCreators from 'core/actions/actions-asset'

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: '',
      imagePlaceholder: '',
      loading: false,
      finished: false,
      stepIndex: 0
    }
  }

  componentDidMount() {    
    this.setImage()
    this.showImage()
  }

  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      }));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1
      }));
    }
  };

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        </div>
      );
    }
    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div id="button-controls">
          <Button
            type="raised"
            label={stepIndex === 2 ? 'Pay & Confirm' : 'Next'}
            primary={true}
            onClick={this.handleNext}
          />
          <Button
            type="flat"
            label="Back"
            secondary={true}
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
            style={{marginRight: 12}}
          />
        </div>
      </div>
    );
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
    case 0:
      return (
          <div id="registration-form">
            <h2>Step 1 - Enter Your Credentials</h2>
            <span>Your email address and public key are registered on the Blockchain</span>
            <Form>
              <Label text="Your Email Address" />
              <Input type="text" />
              <Label text="Your Ethereum Wallet Address (Public Key)" />
              <Input type="text" />
            </Form>
          </div>)
    case 1:
      return (
          <div id="registration-form">
            <h2>Step 2 - Create A Unique Hash Of Your Asset</h2>
            <span>The SHA256 algorithm is used to create a unique fingerprint of your asset</span>
            <Form>
              <Label text="Your Asset's Unique Hash" />
              <Input type="text" value={"2sdlkjfghl345345lkjh"} disabled/>
            </Form>
          </div>)
    case 2:
      return (
          <div id="registration-form">
            <h2>Step 3 - Pay Gas & Confirm Transaction</h2>
            <span>You need to pay gas in Ether in order to create a record on the Blockchain</span>
            <Form>
              <Label text="Estimated Gas" />
              <Input type="text" value={123123123} disabled/>
            </Form>
          </div>)
    }
  }

  setImage=() => {
    const { asset } = this.props

    if(!asset.stagedAsset) {
      this.setState({ mainImage: imagePlaceholderSvg })
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(asset.stagedAsset)

      reader.onload = () => {
        this.setState({ mainImage: reader.result });
      }

    } 
  }

  showImage=() => {
    this.setState({ imagePlaceholder: <ProgressIndicator 
                                        color={getStyles('$lightBlue')}
                                        type="circle"
                                        size={60}
                                        thickness={6} /> })

    setTimeout(() => {
      const { mainImage } = this.state

      this.setState({ imagePlaceholder: <img src={mainImage} /> })
    }, 1000)

  }

  render() {
    const { imagePlaceholder } = this.state
    const { stepIndex} = this.state;

    return (
      <div className={styles}> 
        <div id="register-view">   
          <div id="image-container">
            <Paper zDepth={1}>
              <div id="image-preview">
                {imagePlaceholder}
              </div>
            </Paper>
          </div>
          <div>
            <div id="registration-form-container">
              <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Enter your credentials</StepLabel>
              </Step>
              <Step>
                <StepLabel>Generate a unique hash</StepLabel>
              </Step>
              <Step>
                <StepLabel>Pay Gas & Confirm</StepLabel>
              </Step>
              </Stepper>

              {this.renderContent()}

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
