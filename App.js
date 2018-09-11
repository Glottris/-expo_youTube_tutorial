import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from './SearchBar';

export default class App extends React.Component {
  onPressSearch = searchTerm => {
    console.log(searchTerm)
  }
  render() {
    return (
      <View>
        <Header
          centerComponent={{text: 'YouTube', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />
        <SearchBar
          onPressSearch={this.onPressSearch}
        />
      </View>
    );
  }
}
