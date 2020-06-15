import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MovieListScreen } from "./MovieListScreen";
import { MovieDetailsScreen } from "./MovieDetailsScreen";

const Stack = createStackNavigator();

function AppNavigation(props) {
    return (
        // <NavigationContainer>
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
        // </NavigationContainer>
    );
}

export { AppNavigation };
