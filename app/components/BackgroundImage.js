import React, { Component } from "react";
import { Image, StyleSheet, ImageBackground } from "react-native";

class BackgroundImage extends Component {
  render() {
    return (
      <ImageBackground
				source={require('../assets/images/login_bg.png')}      
				style={styles.container}
				resizeMode={'cover'}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default BackgroundImage;
