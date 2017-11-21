import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView
} from "react-native";
import { Button, Icon } from "react-native-elements";
import Layout from "../constants/Layout";

const data = [
  {
    key: "1",
    text: "Press the home button on your iPhone."
  },
  {
    key: "2",
    text: "Open iPhone Settings select Wifi."
  },
  {
    key: "3",
    text: "Select Button."
  },
  {
    key: "4",
    text:
      "Password is the last 8 characters of the device serial number (DSN). You'll find the DSN on the back of the device.."
  },
  {
    key: "5",
    text: "Remember the last 3 characters from the Button ConfigureMe Network."
  },
  {
    key: "6",
    text: "Return to Marmon App and Continue."
  }
];

export default class IOSConnectButtonSteps extends Component {
  static navigationOptions = {
    tabBarLabel: "Setup",
    headerTitle: `Button Setup`,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#0C6A9B",
      height: Platform.OS === "ios" ? 60 : 80,
      paddingTop: 20
    }
  };

  componentWillMount() {
    if (Platform.OS === "android") {
      this.props.navigation.navigate("saveCredentials");
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 2 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "#868686",
              paddingVertical: 20
            }}
          >
            Connect to your Buttons's Wi-Fi
          </Text>
          <BulletList data={data} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button
            onPress={() => this.props.navigation.navigate("saveCredentials")}
            title="NEXT"
            buttonStyle={{ backgroundColor: "#0C6A9B" }}
            raised
          />
        </View>
      </ScrollView>
    );
  }
}

const BulletList = props => {
  const toRender = props.data.map(i => {
    return (
      <View style={{ paddingHorizontal: 8, flexDirection: "row" }}>
        <View style={{ width: 20 }}>
          <Text style={styles.text}>{i.key}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{i.text}</Text>
        </View>
      </View>
    );
  });
  return <View style={{ flex: 1 }}>{toRender}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8
  },
  text: {
    paddingHorizontal: 8,
    paddingBottom: 5,
    color: "#868686"
  }
});
