import {
  ActivityIndicator,
  BackHandler,
  Image,
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import {hp, wp} from '../styles/responsive';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAxios} from '../hooks/useAxios';
import {LOGIN_URL} from '../config/urls';

const Login = () => {
  const navigation = useNavigation();
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const isFocused = useIsFocused();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [keyBoardHight, setKeyBoardHight] = useState({
    isVisible: false,
    height: 0,
  });

  const {loading, fetchData} = useAxios();

  useEffect(() => {
    if (!isFocused) return;
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });

    Keyboard.addListener('keyboardDidShow', e => {
      console.log(e.endCoordinates.height);
      setKeyBoardHight({
        isVisible: true,
        height: e.endCoordinates.height,
      });
    });
    Keyboard.addListener('keyboardDidHide', e => {
      setKeyBoardHight({
        isVisible: false,
        height: e.endCoordinates.height,
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, [isFocused]);

  const login = async () => {
    if (!email && !password) {
      setErrorMessage('Email and Password Is Required');
      return;
    }
    if (!email) {
      setErrorMessage('Email Is Required');
      return;
    } else if (!password) {
      setErrorMessage('Password Is Required');
      return;
    }
    setErrorMessage('');
    try {
      const response = await fetchData({
        url: LOGIN_URL,
        method: 'POST',
        data: {
          UserName: email,
          Password: password,
          Mobile: true,
        },
      });

      if (response.statusCode === 6000) {
        await AsyncStorage.setItem('user-data', response?.token);
        navigation.navigate('Home');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setErrorMessage(error?.message);
    }
  };

  const handleSubmitEditing = filed => {
    if (filed === 'username') {
      passwordRef?.current?.focus();
    } else {
      login();
      Keyboard.dismiss();
    }
  };

  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <View style={styles.inputContainer}>
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
          translucent
        />
        <View>
          <LinearGradient
            colors={colors.lightGradient}
            end={{
              x: 0,
              y: 1,
            }}
            style={[
              styles.gradientCurcle,
              keyBoardHight.isVisible && {
                marginTop: hp(5),
              },
            ]}>
            <Image
              style={[styles.logoImage]}
              source={require('./../assets/images/1.png')}
            />
          </LinearGradient>
        </View>
        <View
          style={[
            {
              paddingHorizontal: wp(10),
              width: '100%',
            },
          ]}>
          <View style={styles.inputBoxContainer}>
            <TextInput
              placeholder="Username or Email"
              style={styles.inputBox}
              enterKeyHint="next"
              ref={usernameRef}
              placeholderTextColor={colors.primary}
              onSubmitEditing={() => handleSubmitEditing('username')}
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
              secureTextEntry
              style={styles.inputBox}
              placeholderTextColor={colors.primary}
              ref={passwordRef}
              onSubmitEditing={() => handleSubmitEditing('password')}
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
              {loading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'space-between'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  gradientCurcle: {
    width: wp(70),
    height: wp(70),
    borderRadius: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(15),
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '100%',
    color: colors.primary,
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
    width: '100%',
    padding: wp(10),
    paddingHorizontal: wp(13),
    backgroundColor: colors.primary,
    height: hp(20),
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
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
