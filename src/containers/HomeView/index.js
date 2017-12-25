import React, { Component }   from 'react'
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }         from 'react-router-dom';
import { UploadBox }          from 'components/UploadBox'
import Button                  from 'components/Button'

/* component styles */
import { styles } from './styles.scss';

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
      actions.ui.showModal({
        title: 'You need to install MetaMask'
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
    provider: state.provider,
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
