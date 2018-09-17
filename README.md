

# React-Native Expo AcornTube tutorial
## Overview
This tutorial will go thru step by step how to make a video app that browse YouTube, using Expo
Insert Image here!

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
Our app will contain tree main components, a header, a search-bar and a list of videos(search results).
```
App
 +-- Header
 +-- SearchBar /- inputfield - button
 +-- VideoList
        +-- VideoListItem /- thumbnail - text
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

Then we import it in our **App.js** file, and add a new `Header` element
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
I removed the styling from the view so the header is not centered.
Now your application should look like this:
![AcornTube1](images/screenshot_just_header.png)

## Search bar
Our search bar will consist of two parts, an input filed and a button, wrapped in a 'View' component.
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
So we moved our styles and `View` encompassing the SearchBar to this new file.
Lets go back to **App.js** and cleanup the imports we don't need and import our new searchBar component. And add it bellow our header.

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

if we run it now it will look like this: ![AcornTube1](images/with_searchbar_2.png)

So we need to style our layout, add an action to the button and capture the search input.
In this next step we add the styles. We change the flexDirection of the container style to `row` this means it will expand horizontally to fill the whole row.
```javascript
    return (
      ...
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
          />
          <Button
            buttonStyle={styles.button}
            title="Search"
          />
        </View>
...

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: 10
  },
  button: {
    height: 30,
    marginBottom: 8
  }
});
```
---
Next we add a `state` variable to hold our searchTerm. `state` is a special keyword in react that will re-render components when changed with the setState function.

In our **TextInput** component we then update this state and the value of the text field to whatever is typed.

In our **Button** component we add an `onPress` function that just logs our searchTerm for now.
```javascript
export default class App extends React.Component {
  state = { searchTerm: '' };

  render() {
    return (
      <View>
        <Header
          centerComponent={{text: 'YouTube', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            onChangeText={searchTerm => this.setState({searchTerm})}
            value={this.state.searchTerm}
          />
          <Button
            buttonStyle={styles.button}
            title="Search"
            onPress={() => console.log(this.state.searchTerm)}
          />
        </View>
      </View>
    );
  }
}
```

### Passing back the searchTerm to our main app
We need to get the search term back to our main application to fetch the data from the youTubeAPI to be displayed in the videoList.
We do this by passing a function reference to our `SearchBar` object, that we then call when the search button is pressed.
Adding a function in **App.js**, and passing it to `SearchBar`
```javascript
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
```
And in **SearchBar** we change our `onPress` inside our Button component to:
```javascript
onPress={() => this.props.onPressSearch(this.state.searchTerm)}
```
the `props` keyword is short for properties, and is used like arguments to components.
Test that it works :)

## Video List
### YouTube API key
Before we start creating our Video list we need to get the data, for this we need our  [YouTubeAPI key](https://github.com/appsupport-at-acorn/react-and-rn-intro/blob/master/tutorial/react/prerequisites.adoc#generate-a-youtube-api-key)

for this simple tutorial we will just store the key in our **App.js** like this:
```javascript
const API_KEY = 'YOUR-API-KEY-HERE' // or use mine 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'
```
** NOTE that it's very poor security practice to store anything you wish to maintain secret in your application.**

### Installing youtube-api-search plugin module
in your project directory run
```bash
npm install --save youtube-api-search
# or
yarn add youtube-api-search
```
### Importing and calling youtube-api-search
So now we import a function called `YTSearch` from the `youtube-api-search`.
We create a new function that calls this with our `API_KEY` and `searchTerm` and log what is returned. We call this function from our `onPressSearch` passing it the `searchTerm`

**App.js**
```javascript
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
    YTSearch({key: API_KEY, term: searchTerm}, videos => {
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
```
Try this out and take a look at the log to see what we get from the YouTubeAPI.

### Loading state (Optional?)
In this section we create a loading state that is `true` while we wait for the YTSearch function to return and pass it to the search button.

```javascript
export default class App extends React.Component {
state = {
  loading: false
}
  onPressSearch = searchTerm => {
    this.searchYouTube(searchTerm)
  }
  searchYouTube = searchTerm => {
    this.setState({loading: true});
    YTSearch({key: API_KEY, term: searchTerm}, videos => {
      console.log(videos);
      this.setState({loading: false});
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
          loading={this.state.loading}
          onPressSearch={this.onPressSearch}
        />
      </View>
    );
  }
}
```

In **SearchBar.js** change the `Button` title to depend on the loading state, passed thru props.
```javascript
title={this.props.loading ? "Loading..." : "Search"}
```
### VideoList Component
Now we are ready to make our `VideoList` and `VideoListItem` components.

New file **VideoList.js**
```javascript
import React from 'react';
import {ScrollView, View} from 'react-native';

const VideoList = ({videos}) => {
  const videoItems = videos.map( video => (
    <View />
  ));

  return (
    <ScrollView>
      <View style={{marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 10 }}>
        {videoItems}
      </View>
    </ScrollView>
  );
};

export default VideoList;
```
Here we prepare to use the data from the API, that we will read into objects using the *map* function. We return a `View` component inside a `ScrollView` component. The `View` component is styled with some margins and inside it we call a function called *videoItems*. Here we will put a videoListItem, but for now we just return an empty`View`

Now we go back to **App.js** and import our `VideoList` component, store the video data in a list inside our `state` and add a `VideoList` element after our `SearchBar` passing in the videos list from our *state*

**App.js**
```javascript
import VideoList from './VideoList'
...
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
      <View>
        <Header
          centerComponent={{text: 'YouTube', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />
        <SearchBar
          loading={loading}
          onPressSearch={this.onPressSearch}
        />
        <VideoList videos={videos}/>
      </View>
    );
```
I also added a shorthand for `this.state` for the *loading* and *videos* variables.

### VideoListItem Component
New file **VideoListItem.js**
```javascript
import React from 'react';
import { View, Text, Image } from 'react-native'

const VideoListItem = ({video}) => {
  return(
    <View>
      <Image
        style={{ height: 180 }}
        source={{uri: video.snippet.thumbnails.medium.url}}
      />
      <Text>{video.snippet.title}</Text>
      <Text>{video.snippet.channelTitle}</Text>
      <Text>{video.snippet.description}</Text>
    </View>
  );
};

export default VideoListItem;
```
Here we import the basic `View, Text, Image` from react native and return some tags filled with the data from a video object.

Now we need to go back to **VideoList.js** and use this and pass in the video data.
```javascript
import VideoListItem from './VideoListItem'
...
  const videoItems = videos.map( video => (
    <VideoListItem
      key={video.etag}
      video={video}
    />
  ));
```

![alt text](https://github.com/Glottris/-expo_youTube_tutorial/blob/master/assets/expoExample4.JPG "ExpoExample4")


## Card Styling

In **VideoListItem.js** we import a `Card` component and add styling
```javascript
import React from 'react';
import { View, Text, Image} from 'react-native'
import { Card } from 'react-native-elements'

const VideoListItem = ({video}) => {
  const {card, image, textBox, title, channel, description} = styles;
  return(
    <View>
      <Card containerStyle={card}>
        <Image
          style={image}
          source={{uri: video.snippet.thumbnails.medium.url}}
        />
        <View style={textBox}>
          <Text style={title}>
            {video.snippet.title}
          </Text>
          <Text style={channel}>
            {video.snippet.channelTitle}
          </Text>
          <Text style={description}>
            {video.snippet.description}
          </Text>
        </View>
      </Card>
    </View>
  );
};

const styles = {
  card: {
    padding: 5
  },
  image: {
    alignSelf: 'stretch',
    height: 180
  },
  textBox: {
    flex: 1,
    padding: 1
  },
  title: {
    fontSize: 12,
  },
  channel: {
    fontSize: 11,
    color: '#777',
    alignSelf: 'flex-end'
  },
  description: {
    fontSize: 10,
    alignSelf: 'center'
  }
};

export default VideoListItem;
```
![alt text](https://github.com/Glottris/-expo_youTube_tutorial/blob/master/assets/expoExample5.JPG "ExpoExample5")

!!! I had some problem here, on android emulator, when I can't scroll all the way down. The last part is hidden under the navigation bar, i added a style of `flex: 1` to the top `View` in **App.js** to workaround this. !!!



## Play Video
