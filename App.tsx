import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator.tsx';
import CustomIcon from './src/components/CustomIcon.tsx';
import DetailsScreen from './src/screens/DetailsScreen.tsx';
import PaymentScreen from './src/screens/PaymentScreen.tsx';

const stack = createNativeStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
    <stack.Navigator screenOptions={{headerShown:false}}>
    <stack.Screen name="Tab"  component={TabNavigator}  options={{animation:'slide_from_bottom'}}></stack.Screen>
      <stack.Screen name="Details"  component={DetailsScreen}  options={{animation:'slide_from_bottom'}}></stack.Screen>
      <stack.Screen name="Payment"  component={PaymentScreen}  options={{animation:'slide_from_bottom'}}></stack.Screen>
    </stack.Navigator>
   </NavigationContainer>
  );
};

export default App;

