import React from 'react'
import { StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import CartScreen from '../screens/CartScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import CustomIcon from '../components/CustomIcon'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
        <Tab.Screen name="Favorite" component={FavoritesScreen}></Tab.Screen>
        <Tab.Screen name="Cart" component={CartScreen}></Tab.Screen>
        <Tab.Screen name="Order" component={OrderHistoryScreen}></Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})


export default TabNavigator