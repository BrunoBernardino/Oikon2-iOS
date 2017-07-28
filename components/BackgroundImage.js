import React, { Component } from 'react';
import { Image } from 'react-native';

class BackgroundImage extends Component {
  render() {
    const {source, children, style, ...props} = this.props;
    return (
      <Image source={ source }
        style={ { flex: 1, width: null, height: null, ...style } }
        resizeMode={Image.resizeMode.cover}
        {...props}
      >
        { children }
      </Image>
    );
  }
}

BackgroundImage.propTypes = {
  source: React.PropTypes.number,
  children: React.PropTypes.object,
  style: React.PropTypes.object
};

export default BackgroundImage;
