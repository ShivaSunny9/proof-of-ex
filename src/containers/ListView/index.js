import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export default class ListView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>    
        <h2>Your Assets</h2>
      </div>
    );
  }
}
