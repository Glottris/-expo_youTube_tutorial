

# React-Native AcornTube tutorial
## Overview
This tutorial will go thru step by step how to make a video app that browse YouTube, using React Native

## Prerequisites

* [prerequisites](../../prerequisites.md)

## Create Hello App
```sh
react-native init tutorial_acorntube
cd tutorial_acorntube/
```

Install some extra components used for this app.

```
npm install --save react-native-elements youtube-api-search
```
or (yarn)

```
yarn add react-native-elements youtube-api-search
```

then

```
react-native link
```

## Component structure
Our app will contain three main components, a header, a search-bar and a list of videos(search results).
```
App
 +-- Header
 +-- SearchBar /- inputfield - button
 +-- VideoList
        +-- VideoListItem /- thumbnail - text
```

Import Header in our **App.js** file, and add a new `Header` element
```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Header
          centerComponent={{text: 'YouTube', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />
      </View>
    );
  }
}
```

Create 3 additional files beside App.js:
- SearchBar.js
- VideoListItem.js
- VideoList.js

```sh
touch SearchBar.js
touch VideoListItem.js
touch VideoList.js
```

Now your application should look like this:
![AcornTube1](images/screenshot_just_header.png)

## Search bar
Our search bar consists of two parts, an input field and a button, wrapped in a 'View' component.
We import `TextInput` from **react-native** and `Button` from **react-native-elements** and create a view underneath our header with one of each element
```javascript
import React from 'react';
import { Platform, StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export class SearchBar extends React.Component {
  state = { searchTerm: '' };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={searchTerm => this.setState({searchTerm})}
          value={this.state.searchTerm}
        />
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonTextStyle}
          title="Search"
          onPress={() => this.props.onPressSearch(this.state.searchTerm)}
        />
      </View>
    );
  }
}

// Add an underline on iOS.
const textInputIos = Platform.OS === 'ios' ? {
  borderColor: 'gray',
  borderBottomWidth: 1
} : {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    ...textInputIos,
    flex: 1,
    marginLeft: 10
  },
  button: {
    height: 30,
    marginBottom: 8
  },
  buttonTextStyle: {
    color:'white',
    height: 24,
    fontSize: 18,
    alignSelf: 'center'
  }
});

```

Lets go back to **App.js** and import our new SearchBar component.  We can also change the displayed name to "AcornTube"

**App.js**
```javascript
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from './SearchBar';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Header
          centerComponent={{text: 'AcornTube', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />
        <SearchBar />
      </View>
    );
  }
}
```

If we run it now it will look like this: ![AcornTube1](images/with_searchbar_2.png)

**VideoListItem.js**

We now need to add the list of search results. We start with VideoListItem.js.  This defines how each found video is displayed.  

```javascript
import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native'
import { Card } from 'react-native-elements'

const styles = StyleSheet.create({
  card: { padding: 5 },
  image: { alignSelf: 'stretch', height: 180 },
  textBox: { flex: 1, padding: 1 },
  title: { fontSize: 12, },
  channel: { fontSize: 11, color: '#777', alignSelf: 'flex-end' },
  description: { fontSize: 10, alignSelf: 'center' }
});

const VideoListItem = ({video}) => {
  return(
    <View>
      <Card containerStyle={styles.card}>
        <Image
          style={styles.image}
          source={{uri: video.snippet.thumbnails.medium.url}}
        />
        <View style={styles.textBox}>
          <Text style={styles.title}>
            {video.snippet.title}
          </Text>
          <Text style={styles.channel}>
            {video.snippet.channelTitle}
          </Text>
          <Text style={styles.description}>
            {video.snippet.description}
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default VideoListItem;
```
**VideoList.js**

Here we prepare to use the data from the API, that we will read into objects using the *map* function. We return a `View` component inside a `ScrollView` component. The `View` component is styled with some margins and inside it we call a function called *videoItems*.

Now we create a helper utility which takes a "videos" object and maps each element to a VideoListItem, then returns a ScrollView  containing the items.

```javascript
import React from 'react';
import {ScrollView, View} from 'react-native';
import VideoListItem from './VideoListItem'

const VideoList = ({videos}) => {
  const videoItems = videos.map( video => (
    <VideoListItem
      key={video.etag}
      video={video}
    />
  ));

  return (
    <ScrollView>
      <View style={{marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
        {videoItems}
      </View>
    </ScrollView>
  );
};

export default VideoList;

```
## Putting it all together in App.js

The `state` variable in App.js holds our searchTerm. `state` is a special keyword in react that will re-render components when changed with the setState function.

In our **TextInput** component we update this state and the value of the text field to whatever is typed.

In our **Button** component we have an `onPress` function that just logs our searchTerm for now.

### Passing back the searchTerm to our main app
We need to get the search term back to our main application to fetch the data from the youTubeAPI to be displayed in the videoList.
We do this by passing a function reference to our `SearchBar` object, that we then call when the search button is pressed.
Adding a function in **App.js**, and passing it to `SearchBar`

And in **SearchBar** we change our `onPress` inside our Button component to:
```javascript
onPress={() => this.props.onPressSearch(this.state.searchTerm)}
```
the `props` keyword is short for properties, and is used like arguments to components.
Test that it works :)

App.js uses the API key created in the prerequisites, like this.
```javascript
const API_KEY = 'YOUR-API-KEY-HERE' // or use mine 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'
```
** NOTE that it's very poor security practice to store anything you wish to maintain secret in your application.**

### Importing and calling youtube-api-search
**App.js** imports a function called `YTSearch` from the `youtube-api-search`.
We create a new function that calls this with our `API_KEY` and `searchTerm` and log what is returned. We call this function from our `onPressSearch` passing it the `searchTerm`

## Loading state
In this section we create a loading state that is `true` while we wait for the YTSearch function to return and pass it to the search button.

**App.js** imports our `VideoList` component, stores the video data in a list inside our `state` and add a `VideoList` element after our `SearchBar` passing in the videos list from our *state*

**App.js**
```javascript
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from './SearchBar';
import VideoList from './VideoList'
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'

export default class App extends React.Component {
  state = {
    loading: false,
    videos: []
  }
  onPressSearch = searchTerm => {
    this.searchYouTube(searchTerm)
  }
  searchYouTube = searchTerm => {
    this.setState({loading: true});
    YTSearch({key: API_KEY, term: searchTerm}, videos => {
      this.setState({loading: false, videos: videos});
    })
  }
  render() {
    const {loading, videos} = this.state;
    return (
      <View style={{flex:1}}>
        <Header
          centerComponent={{text: 'AcornTube', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />
        <SearchBar
          loading={loading}
          onPressSearch={this.onPressSearch}
        />
        <VideoList videos={videos}/>
      </View>
    );
  }
}
```
Try this out and take a look at the log to see what we get from the YouTubeAPI.

### Loading state

Update **SearchBar.js** to change the `Button` title to depend on the loading state, passed through props.
```javascript
title={this.props.loading ? "Loading..." : "Search"}
```
