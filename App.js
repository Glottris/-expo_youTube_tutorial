import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from './SearchBar';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'

export default class App extends React.Component {

  onPressSearch = searchTerm => {
    this.searchYouTube(searchTerm)
  }

  searchYouTube = searchTerm => {
    YTSearch({key: API_KEY, searchTerm}, videos => {
      console.log(videos);
    })
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
