import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {wp} from '../../styles/responsive';
import {colors} from '../../styles/style';

const Modal = ({message,handleRetry}) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: colors.textOrange,
        padding: wp(5),
        borderRadius: wp(2),
        elevation:5
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          color: colors.dark,
          fontSize: wp(3.5),
          textAlign: 'center',
        }}>
        {message}
      </Text>
      <Pressable onPress={handleRetry}
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
  );
};

export default Modal;

const styles = StyleSheet.create({});
