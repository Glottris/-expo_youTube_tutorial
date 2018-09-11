

# React-Native Expo you_tube_tutorial
## Overview
This tutorial will go thru step by step how to make a video app that browse YouTube, using react-native, react-native extensions: React Navigation and YouTube API.v3
Insert Image here!

## Prerequisites

* [Node.js](https://www.npmjs.com/)
* YouTube API key
* Android or IOS emulator

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
For the header we will use react-native-element package, so first we need to install it.
```bash
npm install --save react-native-elements
# or with yarn
yarn add react-native-elements
```
Documentation: https://react-native-training.github.io/react-native-elements/docs/0.19.0/header.html#header-with-default-components

Then we import it in our App.js file, and add a new 'Header' element
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
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Header, Button } from 'react-native-elements';

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
          />
          <Button
            buttonStyle={styles.button}
            title="Search"
          />
        </View>
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
Lets go back to **App.js** and cleanup the imports we don't need and import our new searchBar component.
And add it bellow our header
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

## Video List...

