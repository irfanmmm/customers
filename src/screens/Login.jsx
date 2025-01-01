import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import {hp, wp} from '../styles/responsive';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, [isFocused]);


  const login = async () => {
    if (!email && !password) {
      setErrorMessage('Email and Passowd Is Requerd');
      return;
    }
    if (!email) {
      setErrorMessage('Email Is Requerd');
      return;
    } else if (!password) {
      setErrorMessage('Password Is Requerd');
      return;
    }
    setErrorMessage('');
    await AsyncStorage.setItem(
      'user-data',
      JSON.stringify({
        email,
        password,
      }),
    );
    navigation.navigate('Home');
  };
  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <LinearGradient
            colors={colors.lightGradient}
            end={{
              x: 0,
              y: 1,
            }}
            style={styles.gradientCurcle}>
            <StatusBar
              backgroundColor={'transparent'}
              barStyle={'dark-content'}
              translucent
            />
            <Image
              style={styles.logoImage}
              source={require('./../assets/images/1.png')}
            />
          </LinearGradient>
          <View style={styles.inputBoxContainer}>
            <TextInput
              placeholder="Username or Email"
              style={styles.inputBox}
              onChangeText={email => {
                setErrorMessage('');
                setEmail(email);
              }}
            />
            <View style={styles.inputIcon}>
              <Ionicons
                name="person-outline"
                color={colors.secondary}
                size={wp(5.5)}
              />
            </View>
          </View>
          <View style={styles.inputBoxContainer}>
            <TextInput
              placeholder="Password"
              style={styles.inputBox}
              onChangeText={email => {
                setErrorMessage('');
                setPassword(email);
              }}
            />
            <View style={[styles.inputIcon, {marginLeft: -wp(1)}]}>
              <EvilIcons name="lock" color={colors.secondary} size={wp(8)} />
            </View>
          </View>
          {errorMessage && (
            <Text
              style={{
                color: 'red',
                fontSize: wp(3),
                fontFamily: 'Montserrat-Medium',
              }}>
              {errorMessage}
            </Text>
          )}
        </View>
        <View style={styles.footerContainer}>
          <LinearGradient
            colors={colors.gradient}
            start={{
              x: 0,
              y: 1,
            }}
            style={styles.gradientBtn}>
            <Pressable onPress={login}>
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </KeyboardAvoidingScrollView>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  gradientCurcle: {
    width: wp(70),
    height: wp(70),
    borderRadius: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
    marginTop: hp(20),
  },
  logoImage: {
    width: wp(80),
    height: wp(80),
    resizeMode: 'contain',
    marginBottom: wp(8),
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: hp(10),
  },
  inputBoxContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: wp(1),
    borderRadius: wp(10),
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: wp(5),
    // position: 'relative',
  },
  inputBox: {
    paddingLeft: wp(15),
    fontSize: wp(4),
    fontFamily: 'Montserrat-Regular',
  },
  inputIcon: {
    position: 'absolute',
    top: '30%',
    left: wp(5),
  },
  footerContainer: {
    position: 'absolute',
    bottom: -hp(25),
    width: wp(100),
    left: wp(0),
    padding: wp(10),
    paddingHorizontal: wp(13),
    backgroundColor: colors.primary,
    height: hp(20),
    borderTopEndRadius: wp(10),
    borderTopStartRadius: wp(10),
  },
  gradientBtn: {
    borderRadius: wp(8),
    width: '100%',
    padding: wp(2),
    paddingVertical: wp(3),
    borderWidth: wp(0.7),
    borderColor: colors.secondary,
  },
  loginText: {
    fontSize: wp(4),
    textAlign: 'center',
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
  },
});
