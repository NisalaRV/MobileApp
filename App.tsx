import React from 'react';
import { SafeAreaView, Text, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>hello React Native</Text>
    </SafeAreaView>
  );
}

export default App;
