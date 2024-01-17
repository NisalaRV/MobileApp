import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import Header from '../components/Header';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getBiriyaniList = (category:string, data:any) =>{
  if (category == 'All'){
    return data;
  }else {
    let biriyanilist =data.filter((item:any) => item.name == category);
    return biriyanilist;
  }

}

const HomeScreen = () => {
  const BiriyaniList = useStore((state: any) => state.BiriyaniList);
  const DrinksList = useStore((state: any) => state.DrinksList);
  const [catagories, setCategories] = useState(
    getCategoriesFromData(BiriyaniList),
  );
  const [searchText, setSearchText] = useState(undefined);
  const [catagoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: catagories[0],
  });
  const [sortedBiriyani, setSortedBiriyani] = useState(getBiriyaniList(catagoryIndex.category,BiriyaniList));
  const tabBarHeight = useBottomTabBarHeight ();

  return <View style = {styles.ScreenContainer}>
    <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
    <ScrollView 
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={styles.ScrollViewFlex}>
      {/* App Header */}
   <Header title={'Biriyani Kade'} />
    </ScrollView>
  </View>
  
}

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow: 1,
  },
})

export default HomeScreen;