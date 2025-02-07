import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import {wp} from '../styles/responsive';
import RNRestart from 'react-native-restart';

const Error = ({route}) => {
  const handleRetry = () => {
    RNRestart.Restart();
  };
  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <View
        style={{
          width: '100%',
          backgroundColor: colors.textOrange,
          padding: wp(5),
          borderRadius: wp(2),
          elevation: 5,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            color: colors.dark,
            fontSize: wp(3.5),
            textAlign: 'center',
          }}>
          {route.params.message}
        </Text>
        <Pressable
          onPress={handleRetry}
          style={{
            marginTop: wp(5),
            backgroundColor: 'red',
            padding: wp(2),
            borderRadius: wp(2),
            width: wp(20),
            margin: 'auto',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: wp(3.5),
              fontFamily: 'Montserrat-Medium',
              color: colors.primary,
            }}>
            Retry
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
});
