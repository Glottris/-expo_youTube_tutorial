import React from 'react';
import { View, StyleSheet, Image, WebView, TouchableHighlight, Platform } from 'react-native';

export class Video extends React.Component{
  state = {
    play: false
  }
  thumbnail_or_video () {
    if (this.state.play) {
      return (
        <WebView
          style={ styles.WebViewContainer }
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{uri: `https://www.youtube.com/embed/${this.props.video.id.videoId}`}}
        />
      );
    } else {
      return (
        <TouchableHighlight
          onPress={() => this.setState({play: true})}>
          <Image
            style={styles.image}
            source={{uri: this.props.video.snippet.thumbnails.medium.url}}/>
        </TouchableHighlight>
      );
    }
  }

  render () {
    return (
      <View>
        {this.thumbnail_or_video()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'stretch',
    height: 180
  },
  WebViewContainer: {
    height: 240,
    marginTop: (Platform.OS == 'ios') ? 20 : 0,
  },
})
