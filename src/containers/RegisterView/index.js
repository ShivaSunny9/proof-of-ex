import React, { Component }    from 'react';
import { connect }             from 'react-redux'
import { bindActionCreators }  from 'redux'
import { withRouter }          from 'react-router-dom'

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
      history.push('/')
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
          <h2>Register Your Photo</h2>
          <img id="image-preview" src={imagePreviewUrl} />
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
