import React from 'react';
import { StyleSheet, Text, View, FlatList, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions'
import Layout from '../constants/Layout';

class SelectButtonScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarLabel: 'Setup',
    headerTitle: `${navigation.state.params.button.name}`,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ? 60 : 80,
      paddingTop: 20,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      switched: false,
    };
  }

  async _onSubmit(event, button) {
    event.preventDefault();   
    await this.props.setCurrentButton(button[0]);
    this.props.navigation.navigate('setup');
  };

  render() {			
    const button = [this.props.navigation.state.params.button];
    const iconName = Platform.OS === 'ios' ? 'ios-checkmark-circle-outline' : 'md-checkmark';
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <View
            style={{
              height: 50,
              paddingHorizontal: 16,
              flexDirection: 'row',              
              backgroundColor: '#fafafa',
              borderBottomColor: '#eee',
              borderBottomWidth: 1,
            }}
          >
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, opacity: 0.7 }}>
                {this.props.navigation.state.params.button.name}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Icon name={iconName} size={28} color={'#0C6A9B'} />
            </View>
          </View>
        </View>
        <View
          style={{                      
            justifyContent: 'center', flex: 1, paddingHorizontal: 16          
          }}
        >          
          <Button
            onPress={event => this._onSubmit(event, button)}				  
						title="NEXT" 
						buttonStyle={{ backgroundColor: '#0C6A9B' }} 
						raised 
					/>
        </View>
      </View>
    );
  }
}

export default connect(null, actions)(SelectButtonScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'    
  },
});
