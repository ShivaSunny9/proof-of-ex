import React, { Component }  from 'react'
import PropTypes             from 'prop-types'
import { Dialog }            from 'material-ui'

/* component styles */
import { styles } from './styles.scss'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentWillReceiveProps= (nextProps) => {
    const { open } = nextProps
    this.setState({ open: open })
  }

  handleClose=() => {
    const { uiActions } = this.props

    this.setState({ open: false })

    uiActions.closeModal()
  }

  render() {
    const { actions, title, content } = this.props
        
    return(
      <div>
        <Dialog
          title={title}
          actions={actions}
          className={styles}
          modal={false}
          open={this.state.open}
          children={content}
          onRequestClose={this.handleClose}>
        </Dialog>
      </div>
    )
  }

}

Modal.propTypes = {
  open      : PropTypes.bool.isRequired,
  actions   : PropTypes.array,
  title     : PropTypes.string,
  uiActions : PropTypes.object,
  content   : PropTypes.element
}

Modal.defaultProps = {
  open  : false,
  title : 'Please confirm'
}


export default Modal