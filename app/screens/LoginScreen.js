import React from "react";
import {
  FormValidationMessage,
  FormLabel,
  FormInput,
  Button
} from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Linking,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import BackgroundImage from "../components/BackgroundImage";
import * as actions from "../actions";
import auth from "../reducers/auth";

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    const { loginCreds } = this.props;
    if (loginCreds) {
      this.setState({
        email: loginCreds.email,
        password: loginCreds.password
      })
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps && nextProps.isAuthenticated) { 
      this._resetNavigation();      
     }
  }

  _resetNavigation() {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "list" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _onTrobleLogin = () => {
    Linking.openURL(
      "mailto:webmaster@marmonkeystone.com?subject=Trouble logging into portal"
    );
  };

  _onSubmit = () => {
    const { email, password } = this.state;
    const { login } = this.props;
    if (email !== "" || password !== "") {      
      login(this.state);
    } 
  };

  render() {
    const isIOS = Platform.OS === "ios" ? true : false;
    return (
      <BackgroundImage>
        <KeyboardAvoidingView style={styles.container}>
          <View style={{ flex: 2, justifyContent: "flex-end" }}>
            <FormLabel labelStyle={{ backgroundColor: "transparent" }}>
              Email or Username
            </FormLabel>
            <FormInput
              underlineColorAndroid="#0C6A9B"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              autoCapitalize="none"
              returnKeyType="next"
              inputStyle={{ paddingLeft: 5 }}
              autoCorrect={false}
              keyboardType="email-address"
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            <FormLabel labelStyle={{ backgroundColor: "transparent" }}>
              Password
            </FormLabel>
            <FormInput
              underlineColorAndroid="#0C6A9B"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              autoCapitalize="none"
              returnKeyType="go"
              autoCorrect={false}
              inputStyle={{ paddingLeft: 5 }}
              secureTextEntry
              ref={input => (this.passwordInput = input)}
            />
            <View>
              <Text
                style={{
                  fontSize: 12,
                  paddingLeft: 20,
                  color: "red",
                  backgroundColor: "transparent",
                  paddingTop: 20
                }}
              >
                {this.props.error}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              onPress={this._onTrobleLogin}
              style={{
                color: "#0C6A9B",
                fontSize: 12,
                fontWeight: "bold",
                backgroundColor: "transparent",
                paddingBottom: 10,
                paddingLeft: 16
              }}
            >
              Trouble Logging In?
            </Text>
            <Button
              buttonStyle={{ backgroundColor: "#0C6A9B" }}
              raised
              title="LOG IN"
              disabled={this.props.isFetching}
              onPress={this._onSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching,
    loginCreds: state.auth.login,
    error: state.auth.error
  };
};

export default connect(mapStateToProps, actions)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  rowValidation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20
  }
});
