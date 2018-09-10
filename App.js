import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header
          centerComponent={{text: 'YouTubeor', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />

        <View>
          <TextInput />
          <Button />
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
