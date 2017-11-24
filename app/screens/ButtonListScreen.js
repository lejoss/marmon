import React from "react";
import { connect } from "react-redux";
import { List, ListItem, Header } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { selectFilteredButtons } from "../selectors";
import { NavigationActions } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import * as actions from "../actions";

class ButtonListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "Select Button",
      headerLeft: null,
      headerTintColor: "white",
      headerRight: (
        <TouchableOpacity onPress={params.logout && params.logout}>
          <Icon
            name={Platform.OS === "ios" ? "ios-log-out" : "md-log-out"}
            size={28}
            color="#fff"
            style={{ paddingRight: 10 }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "#0C6A9B",
        height: Platform.OS === "ios" ? 60 : 80,
        paddingTop: 20
      }
    };
  };

  state = {
    showButtonAlert: true
  }

  componentWillMount() {
    this.props.navigation.setParams({ logout: this._logout.bind(this) });
  }

  async componentDidMount() {
    try {
      await Promise.all([
        this.props.requestGatewayDataSources(),
        this.props.requestIntegrations()
      ]);
    } catch (error) {
      Alert.alert(
        "Could not load buttons, check wifi services or try restarting the App"
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
        this._resetNavigation();
      }
    }
  }

  _onSelectButton(button) {
    this.props.setCurrentButton(button);
    this.props.navigation.navigate("buttonMode");
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onSelectButton(item)}>
      <ListItem
        title={item.name && item.name.toUpperCase()}
        titleStyle={{ fontSize: 18, color: "#5C5B5C" }}
        subtitle={`DSN: ${item.unique_id}`}
        subtitleStyle={{ fontSize: 14, color: "#868686", opacity: 0.7 }}
        containerStyle={{ borderBottomWidth: 0, height: 65 }}
      />
    </TouchableOpacity>
  );

  _logout() {
    this.props.destroySession();
  }

  _resetNavigation() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.isFetching ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="#0C6A9B" />
          </View>
        ) : (
          <List
            containerStyle={{
              marginTop: 0,
              padding: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0
            }}
          >
            {
              this.state.showButtonAlert && 
              (
                <View
                style={{
                  height: 65,
                  backgroundColor: "#eee",
                  alignItems: "center",                  
                  flexDirection: 'row'
                }}
              >
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 14, color: "#868686", opacity: 0.8 }}>
                  Look on Back for DSN
                </Text>
                <Icon
                  name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                  size={28}
                  color="#868686"
                  style={{ paddingRight: 15, fontWeight: 'bold' }}
                  onPress={() => this.setState({ showButtonAlert:false })}
                />
              </View>
              )
            }
            <FlatList
              data={this.props.buttons}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={this._renderSeparator}
            />
          </List>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    buttons: state.button.buttons, //selectFilteredButtons(state),
    isFetching: state.button.isFetching
  };
};

export default connect(mapStateToProps, actions)(ButtonListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
