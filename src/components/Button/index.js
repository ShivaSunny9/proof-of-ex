/**
 * Button - A common button
 */

import React                    from 'react'
import PropTypes                from 'prop-types'
import { FlatButton,
         RaisedButton,
         FloatingActionButton,
         IconButton }           from 'material-ui'

/* component styles */
import { styles } from './styles.scss'

export default function Button(props) {
  const buttonElem = createButton(props)
  return (
    <div className={styles}>
      {buttonElem}
    </div>
  )
}

function createButton(props) {
  const { type, className } = props
  let buttonElem
  const finalClassName = `btn ${className}`

  switch(type) {
  case 'raised':
    buttonElem = <RaisedButton {...props} className={finalClassName} />
    break
  case 'flat':
    buttonElem = <FlatButton {...props} className={finalClassName} />
    break
  case 'floating':
    buttonElem = <FloatingActionButton {...props} className={finalClassName} />
    break
  case 'icon':
    buttonElem = <IconButton {...props} className={finalClassName} />
    break
  }

  return buttonElem
}

Button.propTypes = {
  type: PropTypes.string
}

Button.defaultProps = {
  type: 'raised'
}