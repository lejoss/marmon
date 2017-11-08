import React from 'react';
import { StyleSheet, Text, View, FlatList, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { List, ListItem, Button } from 'react-native-elements';
//import { NavigationActions } from 'react-navigation';
import Layout from '../constants/Layout';

export default class SelectButtonScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarLabel: 'Setup',
    headerTitle: `${navigation.state.params.button.name}`,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ? 60 : 56,
      paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.statusBarHeight,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      switched: false,
    };
  }

  _onSubmit = event => {
		event.preventDefault();
		// const resetAction = NavigationActions.reset({
		// 	index: 0,
		// 	actions: [
		// 		NavigationActions.navigate({ routeName: 'saveCredentials'})
		// 	]
		// })
		// this.props.navigation.dispatch(resetAction)
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
            onPress={() => this.props.navigation.navigate('setup')}				  
						title="NEXT" 
						buttonStyle={{ backgroundColor: '#0C6A9B' }} 
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
    backgroundColor: '#fff'    
  },
});
