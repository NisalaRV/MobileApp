import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Header from '../components/Header';
import CustomIcon from '../components/CustomIcon';
import BiriyaniCard from '../components/BiriyaniCard';



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
  const [searchText, setSearchText] = useState('');
  const [catagoryIndex, setCategoryIndex] = useState({
    index: 1,
    category: catagories[1],
  });
  const [sortedBiriyani, setSortedBiriyani] = useState(getBiriyaniList(catagoryIndex.category,BiriyaniList));
  const tabBarHeight = useBottomTabBarHeight ();

  // console.log('sortedBiriyani =', sortedBiriyani.length);

  return (
  <View style = {styles.ScreenContainer}>
    <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
    <ScrollView
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={styles.ScrollViewFlex}>
      {/* App Header */}
   <Header title={'Biriyani kade'} />

     <Text style={styles.ScreenTitle}>
       Choice your {'\n'}Favourite
     </Text>

          {/* Search Input */}
      <View style={styles.InputContainerComponent}>
        <TouchableOpacity onPress={() => {}}>
          <CustomIcon
             style={styles.InputIcon}
             name='search'
             size={FONTSIZE.size_18}  
             color={
                searchText.length > 0
                  ? COLORS.primaryYellowHex
                  : COLORS.primaryLightGreyHex
              }
              />
        </TouchableOpacity>
        <TextInput
          placeholder='Find Your Biriyani...'
          value={searchText} 
          onChangeText={text => setSearchText(text)} 
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
        />
      </View>
      {/* Category Scroller*/}

      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
            {catagories.map((data, index) => (
              <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
                 <TouchableOpacity 
                  onPress={() => {
                  setCategoryIndex({index:index,category:catagories[index]})
                  setSortedBiriyani([
                    ...getBiriyaniList(catagories[index], BiriyaniList),
                  ]);
                  }}>
                 <Text
                  style={[
                    styles.CategoryText,
                    catagoryIndex.index == index
                      ? {color: COLORS.primaryYellowHex}
                      : {},
                  ]}>
                  {data}
                </Text>
                {catagoryIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
                 </TouchableOpacity>
              </View>
              ))}
    </ScrollView>
 {/* Biriyani list*/}
           <FlatList
            horizontal showsHorizontalScrollIndicator={false}
            data={sortedBiriyani} 
            contentContainerStyle={styles.FlatListContainer}  
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
            <TouchableOpacity>
              <BiriyaniCard
               id={item.id}
               index={item.index}
               type={item.type}
               rosted={item.rosted}
               imagelink_square={item.imagelink_square}
               name={item.name}
               special_ingredient={item.special_ingredient}
               average_rating={item.average_rating}
               price={item.price}
               buttonPressHandler={item.buttonPressHandler}/>
            </TouchableOpacity>
          );
       }}
           />    
           
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize:FONTSIZE.size_28,
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent:{
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon:{
    marginHorizontal:SPACING.space_20,
  },
  TextInputContainer:{
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle:{
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },

  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryYellowHex,
  },
  FlatListContainer:{
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
})

export default HomeScreen;