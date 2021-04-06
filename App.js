import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer, StackActions} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux';
import Board from './src/components/Board'
import Home from './src/screens/Home'
import Game from './src/screens/Game'
import Finish from './src/screens/Finish'
import store from './src/store';

export default function App() {

  const Stack = createStackNavigator()
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // <View style={styles.container}>
    //   <Text>Game Sudoku</Text>
    //   {/* <Text>{board}</Text> */}
      
    //   <Board />
    //   {/* <StatusBar style="auto" /> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#169186',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
