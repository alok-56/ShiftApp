import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MyShift from './Src/Pages/MyShift';
import AvaliableShift from './Src/Pages/AvaliableShift';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: {
            fontWeight: '600',
            fontSize: 15,
          },
          tabBarIconStyle: {display: 'none'},
        }}>
        <Tab.Screen
          name="My Shifts"
          options={{
            headerShown: false,
          }}
          component={MyShift}
        />
        <Tab.Screen
          name="Available Shifts"
          options={{
            headerShown: false,
          }}
          component={AvaliableShift}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
