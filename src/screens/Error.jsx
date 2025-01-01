import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';

const Error = () => {
  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <Text>Error</Text>
    </LinearGradient>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
