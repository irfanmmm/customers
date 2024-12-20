import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import {wp} from '../styles/responsive';

const Login = () => {
  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <LinearGradient
        colors={colors.lightGradient}
        style={styles.gradientCurcle}>
        <Image source={require('./../assets/images/1.png')} />
      </LinearGradient>
      <Text>Login</Text>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    // paddingVertical: 50,
  },
  gradientCurcle: {
    width: wp(80),
    height: wp(80),
    borderRadius: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
