import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
  StatusBar
} from "react-native";
import { Button } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import Layout from "../constants/Layout";

export default class ConnectionFailureScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Setup Failed",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#0C6A9B",
      height: Platform.OS === "ios" ? 60 : 80,
      paddingTop: 20
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 3, justifyContent: "center", alignItems: "center",}} >
          <Text style={{ textAlign: "center" }}>
            <Text style={styles.bold}>Connection Failed{"\n"} </Text>
            <Text style={styles.content}>
              Please check your internet connection{"\n"}
            </Text>
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => this.props.navigation.navigate("list")}
            title="RETRY"
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
    backgroundColor: "#fff",
    paddingHorizontal: 8
  },
  bold: {
    color: "#868686",
    fontSize: 18,
    fontWeight: "bold"
  },
  content: {
    color: "#868686",
    fontSize: 14,
    fontWeight: "bold"
  }
});
