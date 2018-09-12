
# React-Native Expo you_tube_tutorial
## Overview
This tutorial will go thru step by step how to make a video app that browse YouTube, using Expo
Insert Image here!

## Prerequisites

* [Node.js](https://www.npmjs.com/)
* YouTube API key
* Android or IOS emulator

## Optional Prerequisites
* Atom
* Visual Studio Code
* Another text editor suitable for Javascript

## Setup [Expo](https://expo.io/)
In your shell of preference at the location you wish to store the project run the following
``` bash
> npm install expo-cli --global

> expo init my-new-project
> cd my-new-project
> expo start
```
This initiates new project with your chosen name.
`start expo` will print an address like this:
 `> Expo DevTools is running at http://localhost:19002
`Open this address in a browser.

Before we can run our project form here we need to start an emulator or connect a phone.
If you have an emulator installed you can go ahead and start that one or connect your phone, and **skip** the next section.

### Emulator from Android Studio
Otherwise we need to install one, android studio includes the android emulator. You can download and read how to install android Studio from here: https://developer.android.com/studio/

Step by step using AndroidStudio:
1. Open, android studio.
2. Navigate to `Tools -> AVD Manager`
3. This will open a dialog box, here press create new virtual device.
4. Here select a device to create, I have used Nexus5X.
5. Press `next` and download the needed apis.
6. Press `next` again and select a name and orientation and press `Finish`

## Running basic 'Hello world'
Once we have an emulator or device connected go back to the DevTools page we opened in the browser earlier and press `Run on Android device/emulator`.
This will install expo and prompt you to allow it to show over other apps, accept.

Now we can see our app running, it's just a white screen saying
`Open up App.js to start working on your app!`
So open App.js in your preferred editor and change the text to the mandatory `Hello World`, save it twice and see it update on your device/emulator.

## Component structure
Our app will contain tree main components, a header, a search-bar and a list of videos(search results).
```
App
 +-- Header
 +-- SearchBar /- inputfield - button
 +-- VideoList
        +-- VideoListItem /- thumbnail - text
```

## Header
For the header we will use [react-native-element](https://react-native-training.github.io/react-native-elements) package, so first we need to install it.
```bash
npm install --save react-native-elements
# or with yarn
yarn add react-native-elements
```
Documentation: https://react-native-training.github.io/react-native-elements/docs/0.19.0/header.html#header-with-default-components

Then we import it in our **App.js** file, and add a new `Header` element
```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View>
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
![alt text](https://github.com/Glottris/-expo_youTube_tutorial/blob/master/assets/expoExample1.JPG "ExpoExample1")

## Search bar
Our search bar will consist of two parts, an input filed and a button, wrapped in a 'View' component.
We import `TextInput` from **react-native** and `Button` from **react-native-elements** and create a view underneath our header with one of each element
```javascript
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
```
if we run it now it will look like this: ![alt text](https://github.com/Glottris/-expo_youTube_tutorial/blob/master/assets/expoExample2.JPG "ExpoExample2")

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
Go ahead and test that you can type a search and see it logged when you press search.
The log can be seen under your build tab on the DevTool browser page or where you ran `expo start`

![alt text](https://github.com/Glottris/-expo_youTube_tutorial/blob/master/assets/expoExample3.JPG "ExpoExample3")

### Move SearchBar to a new component
So we don't actually want to re-render our whole app every time someone types something, and we want to get a better overview of our main structure.
So lets move the SearchBar to a new component in a new file.
Create **SerachBar.js** and move the SearchBar to it.

**SerachBar.js**
```javascript
import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
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
          title="Search"
          onPress={() => console.log(this.state.searchTerm)}
        />
      </View>
    );
  }
}
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
So we moved our styles and `View` encompassing the serachBar to this new file.
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
      <View>
        <Header
          centerComponent={{text: 'YouTube', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />
        <SearchBar />
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
And in **SearchBar** we change our `onPress` inside our Button compenent to:
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