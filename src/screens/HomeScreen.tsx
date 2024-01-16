import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'


const HomeScreen = () => {
  const BiriyaniList = useStore((state:any) => state.BiriyaniList);
  const DrinksList = useStore((state:any) => state.DrinksList);
 const [catagories,setCategories] = useState(undefined)

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen