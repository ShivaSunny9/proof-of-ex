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
import Icon                    from 'components/Icon'

/* component styles */
import { styles } from './styles.scss'

import * as assetActionCreators from 'core/actions/actions-asset'

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: '',
      imagePlaceholder: ''
    }
  }

  componentDidMount() {    
    this.setImage()
    this.showImage()
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

    return (
      <div className={styles}> 
        <div id="register-view">   
          <div id="image-container">
            <Paper zDepth={2}>
              <div id="image-preview">
                {imagePlaceholder}
              </div>
            </Paper>
          </div>
          <div>
            <Paper zDepth={2} id="registration-form-container">
              <div id="registration-form">
              <h2>Register Your Digital Asset</h2>
              <span>Create a permanent record of your asset on the Blockchain</span>
              <Form>
                <Label text="Your Email Address" />
                <Input type="text" />
                <Label text="Your Ethereum Wallet Address (Public Key)" />
                <Input type="text" />
                <Label text="Your Asset's Unique Hash" />
                <Input type="text" value={"2sdlkjfghl345345lkjh"} disabled/>
                <Label text="Estimated Gas" />
                <Input type="text" value={123123123} disabled/>
                <Button
                  label="Next"
                  labelPosition="before"
                  type="raised"
                  primary={true}
                  icon={<Icon icon="upload"/>}
                />
              </Form>
              </div>
            </Paper>
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
