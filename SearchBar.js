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
