import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import Button               from 'components/Button'

import { controlsStyles } from './styles'

class Controls extends Component {
  render() {
    const { nextLabel, nextDisabled, prevDisabled } = this.props

    return (
      <div className={controlsStyles}>
        <div id="button-controls">
          <Button
            type="raised"
            label={nextLabel}
            primary
            disabled={nextDisabled}
            onClick={this.handleNext}
          />
          <Button
            type="flat"
            label="Back"
            secondary
            disabled={prevDisabled}
            onClick={this.handlePrev}
          />
        </div>
      </div>
    )
  }

  handleNext = () => {
    const { handleNext } = this.props
    handleNext()
  }

  handlePrev = () => {
    const { handlePrev } = this.props
    handlePrev()
  }

}

Controls.propTypes = {
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
  nextLabel: PropTypes.string,
  nextDisabled: PropTypes.bool,
  prevDisabled: PropTypes.bool
}

Controls.defaultProps = {
  nextLabel: 'Next',
  nextDisabled: true,
  prevDisabled: true
}

export default Controls


