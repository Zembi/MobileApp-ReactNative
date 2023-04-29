import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import SosQuestionsScreen from './src/screens/SosQuestionsScreen';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenNow: 'home'
    }
  }

  changeScreen(moveTo) {
    this.setState({
      screenNow: moveTo
    });
  }

  render() {
    return (
      <SafeAreaProvider>
        <StatusBar
          animated={true}
          backgroundColor="rgb(217, 217, 217)"
          barStyle='dark-content'
        />

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="SosQuestions"
              component={SosQuestionsScreen}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider >
    );
  }
}

const styles = StyleSheet.create({

});