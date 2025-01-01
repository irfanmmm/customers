import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import LottieView from 'lottie-react-native';
import {wp} from '../styles/responsive';

const SplashScreen = () => {
  const navigation = useNavigation();
  const lottie = useRef(null);
  useEffect(() => {
    if (lottie.current) {
      lottie.current.play();
    }
    AsyncStorage.getItem('user-data')
      .then(userData => {
        if (userData) {
          setTimeout(() => {
            navigation.navigate('Home');
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.navigate('Login');
          }, 2000);
        }
      })
      .catch(error => {
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      });
  }, []);
  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />

      <View
        style={{
          width: wp(70),
          height: wp(70),
        }}>
        <LottieView
          style={{
            width: '100%',
            height: '100%',
          }}
          ref={lottie}
          loop
          source={require('./../assets/lottiefiles/splash.json')}
        />
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
