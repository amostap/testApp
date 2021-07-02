import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Loader = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Loading</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  text: {
    fontWeight: '500',
    fontSize: 17,
    color: '#fff',
  },
});

export default Loader;
