import React, { Component }    from 'react';
import { connect }             from 'react-redux'
import { bindActionCreators }  from 'redux'
import { withRouter }          from 'react-router-dom'
import { Paper }               from 'material-ui'
import { Form, Label, Input }  from 'components/Form'
 
/* component styles */
import { styles } from './styles.scss'

import * as assetActionCreators from 'core/actions/actions-asset'

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: ''
    }
  }

  componentDidMount() {
    const { history, asset } = this.props
    
    if(!asset.stagedAsset) {
      // history.push('/')
    } else {
      const reader = new FileReader();

      reader.onload = () => {
        this.setState({
          imagePreviewUrl: reader.result
        });
      }

      reader.readAsDataURL(asset.stagedAsset)
    } 
  }


  render() {
    const { imagePreviewUrl } = this.state

    return (
      <div className={styles}> 
        <div id="register-view">   
          
          <img id="image-preview" src={imagePreviewUrl} />
          <Paper>
            <div id="registration-form">
              <h2>Register Your Digital Asset</h2>
              <span>Fill the form below</span>
              <Form>
                <Label text="Your Email Address" />
                <Input type="text" />
                <Label text="Your Ethereum Wallet Address (Public Key)" />
                <Input type="text" />
                <Label text="Your Asset's Unique Hash" />
                <Input type="text" value={"2sdlkjfghl345345lkjh"} disabled/>
                <Label text="Estimated Gas" />
                <Input type="text" value={123123123} disabled/>
              </Form>
            </div>
          </Paper>
        </div>
      </div>
    );
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
