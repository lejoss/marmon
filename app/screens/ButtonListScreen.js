import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Header } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
	ActivityIndicator,
  StatusBar, 
  Alert
} from 'react-native';
import * as actions from '../actions';

class ButtonListScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Setup',
    headerTitle: 'Button Setup',
    headerLeft: null,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ? 60 : 80,
      paddingTop: 20,
    },
  };

  async componentWillMount() {
    try {
      await Promise.all([this.props.requestGatewayDataSources(), this.props.requestIntegrations()]);
    } catch (error) {
      Alert.alert('Could not load buttons, try restarting the App')
    }    
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('selectedButton', { button: item })}
    >
      <ListItem
        title={item.name}
        titleStyle={{ fontSize: 18, color: '#5C5B5C' }}
        subtitle={`DSN: ${item.unique_id}`}
        subtitleStyle={{ fontSize: 12, color: '#868686' }}
        rightIcon={{ style: { display: 'none' } }}
        containerStyle={{ borderBottomWidth: 0 }}
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
    buttons: state.button.buttons,
    integrations: state.button.integrations,
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
