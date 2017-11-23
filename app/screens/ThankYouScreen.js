import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

export default class ThankYouScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  _resetNavigation() {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'list' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="#0D4969" />
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, textAlign: 'center' }}>
            <Text style={styles.bold}>Your Dash Button{"\n"} </Text>
            <Text style={styles.bold}>has been succesfully connected.{"\n\n"} </Text>
            <Text style={styles.bold}>Thank You!</Text>
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center'  }}>
          <Button
						onPress={() => this.props.navigation.navigate('list')}
            title="BACK TO BUTTON LIST"
            buttonStyle={{ backgroundColor: "#0C6A9B" }}
            raised
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8
  },
  bold: {
    color: '#868686',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
