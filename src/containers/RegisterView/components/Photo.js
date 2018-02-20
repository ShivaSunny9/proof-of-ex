import React, { Component } from 'react';
import { Paper }            from 'material-ui'
import imagePlaceholderSvg  from 'assets/images/image-placeholder.svg'
import ProgressIndicator    from 'components/ProgressIndicator'
import { getString }        from 'core/utils/util-assets'

/* component styles */
import { styles } from '../styles.scss'

export default class Photo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainImage      : null,
      imageContainer : <ProgressIndicator
                        type="circle"
                        size={60}
                        thickness={6} />
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
      getString(asset.stagedAsset, (imageUrl) => {
        this.setState({ mainImage: imageUrl });
      })
    }
  }

  showImage=() => {
    setTimeout(() => {
      const { mainImage } = this.state
      this.setState({ imageContainer: <img src={mainImage} /> })
    }, 500)
  }

  render() {
    const { imageContainer } = this.state

    return (
      <div className={styles}>
        <div id="image-container">
          <Paper zDepth={1}>
            <div id="image-preview">
              {imageContainer}
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}
