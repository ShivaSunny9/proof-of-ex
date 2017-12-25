import React, { Component }   from 'react'
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }         from 'react-router-dom';
import { UploadBox }          from 'components/UploadBox'
import Button                 from 'components/Button'
import metaMaskImg            from 'assets/images/metamask.png'

/* component styles */
import { styles, modalStyles } from './styles.scss';

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileAdded: false
    }
  }

  onDrop=() => {
    this.setState({
      fileAdded: true
    })
  }

  registerAsset=() => {    
    const { provider, history, actions } = this.props

    if(provider.web3Provider !== null) {
      history.push('/register')
      
    } else {
      const modalContent = (
        <div>
          <img className="metamask-logo" src={metaMaskImg } alt="MetaMask logo" />
          <div className="message">
            <p>
              <a href="https://metamask.io/" target="_blank">MetaMask</a> is a wallet and Chrome extension that allows you to make Ethereum transactions from regular websites.
              In order to register your asset on the blockchain, you need to have it installed.
            </p>
            <br />
            <Button 
              keyboardFocused={true}
              label="Install MetaMask Now" 
              raised={true}
              onTouchTap={() => {
                window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en','_blank');
              }} 
            />
          </div>
        </div>
      )

      actions.ui.showModal({
        className : modalStyles,
        title     : 'You need to install MetaMask',
        content   : modalContent
      })
    }

  }

  render() {
    const { fileAdded } = this.state

    return (
      <div className={styles}>   
        <div id="home-view">   
          <UploadBox onDrop={this.onDrop} />
            <div className={!fileAdded ? 'opaque' : ''}>
              <div id="register-actions">
                <Button 
                  onTouchTap={this.registerAsset}
                  label="Register Document On Blockchain"
                  raised={true}
                  className="tertiary" />
                <a id="reset" href="#">Reset</a>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    provider: state.provider
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeView)
)
