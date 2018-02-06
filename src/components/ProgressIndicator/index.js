import React, { Component }  from 'react'
import PropTypes             from 'prop-types'
import { 
  CircularProgress,
  LinearProgress 
}                            from 'material-ui'

/* component styles */
import { styles } from './styles.scss'

class ProgressIndicator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { type } = this.props
    let progressIndicator

    switch(type){
      case 'circle':
        progressIndicator = <CircularProgress {...this.props} />
        break
      case 'linear':
        progressIndicator = <LinearProgress {...this.props} />
        break
    }

    return (
      <div className={styles}>
        <div className="progress-indicator">
          {progressIndicator}
        </div>
      </div>
    );
  }
}

ProgressIndicator.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  thickness: PropTypes.number
}

ProgressIndicator.defaultProps = {
  type: 'circle',
  size: 20,
  thickness: 1
}

export default ProgressIndicator