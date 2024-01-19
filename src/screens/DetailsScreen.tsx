import React from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useStore } from 'zustand'
import { COLORS } from '../theme/theme'


const DetailsScreen = ({navigation,route}: any) => {
  // const ItemofIndex = useStore((state:any)=> 
  // route.params.type == "Biriyani" ? state.BiriyaniList : state.DrinksList,
  // )[route.params.index];
  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
  },

  ScrollViewFlex:{
    flexGrow:1,
    backgroundColor:COLORS.primaryBlackHex,
  },
})

export default DetailsScreen