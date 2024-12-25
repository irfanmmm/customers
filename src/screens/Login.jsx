import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import {hp, wp} from '../styles/responsive';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Login = () => {
  const navigation = useNavigation();
  const login = () => {
    navigation.navigate('Home');
  };
  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <LinearGradient
        colors={colors.lightGradient}
        end={{
          x: 0,
          y: 1,
        }}
        style={styles.gradientCurcle}>
          <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
        <Image
          style={styles.logoImage}
          source={require('./../assets/images/1.png')}
        />
      </LinearGradient>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}>
        <View style={styles.inputBoxContainer}>
          <TextInput
            placeholder="Username or Email"
            inputMode="email"
            style={styles.inputBox}
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
          <TextInput placeholder="Password" style={styles.inputBox} />
          <View style={[styles.inputIcon, {marginLeft: -wp(1)}]}>
            <EvilIcons name="lock" color={colors.secondary} size={wp(8)} />
          </View>
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
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  gradientCurcle: {
    width: wp(70),
    height: wp(70),
    borderRadius: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: wp(80),
    height: wp(80),
    resizeMode: 'contain',
    marginBottom: wp(8),
  },
  inputContainer: {
    flex: 0.5,
    width: '100%',
    paddingHorizontal: wp(10),
  },
  inputBoxContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: wp(1),
    borderRadius: wp(10),
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: wp(5),
    position: 'relative',
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
    bottom: hp(-12),
    width: wp(100),
    left: wp(-2),
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
