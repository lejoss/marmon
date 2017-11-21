import React, { Component } from "react";
import { Image, StyleSheet, ImageBackground, KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class BackgroundImage extends Component {
  render() {
    return (
      <ImageBackground
				source={require('../assets/images/login_bg.png')}      
				style={styles.container}
				resizeMode={'cover'}
      >
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 8 }}>
          {this.props.children}
        </KeyboardAwareScrollView>      
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
