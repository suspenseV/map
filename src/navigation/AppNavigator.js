import React from 'react';

import Map from '../screens/Map';
import MarkerDetails from '../screens/MarkerDetails';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'; 

const MapStack = createNativeStackNavigator();

export default AppNavigator = () => {
  return (
    <NavigationContainer >
      <MapStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MapStack.Screen name="Map" component={Map} />
      <MapStack.Screen
        name="MarkerDetails"
        component={MarkerDetails}
      />
    </MapStack.Navigator>
    </NavigationContainer>
  );
};
