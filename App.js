/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MovieListScreen from './src/MovieListScreen';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppNavigation } from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MovieDetailsScreen } from './src/MovieDetailsScreen';

const Stack = createStackNavigator();

const initialState = {
  genre: [],
  movieList: []
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GENRE': {
      return { ...state, genre: action.payload };
    }
    default: {
      return state;
    }
  }
}

const store = createStore(reducer);

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
      <Provider store={store}>
        
          {/* <AppNavigation /> */}
        
        {/* <MovieListScreen /> */}
        <Stack.Navigator initialRouteName="MovieListScreen">
                <Stack.Screen
                    name="MovieListScreen"
                    component={MovieListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MovieDetailsScreen"
                    component={MovieDetailsScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
      </Provider>
       </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
