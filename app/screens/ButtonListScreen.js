import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { selectFilteredButtons } from '../selectors'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
	ActivityIndicator,
  StatusBar, 
  Alert,
  AsyncStorage
} from 'react-native';
import * as actions from '../actions';

class ButtonListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Select Button',
      headerLeft: null,
      headerTintColor: 'white',
      headerRight: (
        <Icon
          onPress={() => {
            AsyncStorage.removeItem('loginUsername');
            AsyncStorage.removeItem('loginPassword');
            navigation.navigate('Login');
          }}
          name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'} 
          size={28} 
          color="#fff"
          style={{ paddingRight: 20 }}
        />
      ),
      headerStyle: {
        backgroundColor: '#0C6A9B',
        height: Platform.OS === 'ios' ? 60 : 80,
        paddingTop: 20,
      },
    };
  }

  async componentWillMount() {
    try {
      await Promise.all([this.props.requestGatewayDataSources(), this.props.requestIntegrations()]);
    } catch (error) {
      Alert.alert('Could not load buttons, check wifi services or try restarting the App')
    }    
  }

  async _onSelectButton(event, button) {
    event.preventDefault();
    try {      
      await this.props.setCurrentButton(button);
      this.props.navigation.navigate('buttonMode');
    } catch (error) {
      Alert.alert('could not select the button');
    }   
   }

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={(event) => this._onSelectButton(event, item)}
    >
      <ListItem
        title={item.name.toUpperCase()}
        titleStyle={{ fontSize: 20, color: '#5C5B5C' }}
        subtitle={`DSN: ${item.unique_id}`}
        subtitleStyle={{ fontSize: 14, color: '#868686' }}
        rightIcon={{ style: { display: 'none' } }}
        containerStyle={{ borderBottomWidth: 0, height: 80 }}
      />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.isFetching ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0C6A9B" />
          </View>
        ) : (
          <List
            containerStyle={{
              marginTop: 0,
              padding: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
          >
            <FlatList
              data={this.props.buttons}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
            />
          </List>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    buttons: selectFilteredButtons(state),    
    isFetching: state.button.isFetching,
  };
};

export default connect(mapStateToProps, actions)(ButtonListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
