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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1
  },
  button: {
    height: 30,
    marginBottom: 8
  }
});
