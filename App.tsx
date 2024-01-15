import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomIcon from './src/components/CustomIcon.tsx';
const App = () => {
  return (
    <View>
      <CustomIcon name="like" size={25} />
      <Text>hello React Native</Text>
    </View>
  );
};

export default App;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({});
