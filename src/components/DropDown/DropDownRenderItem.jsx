import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {wp} from '../../styles/responsive';
import {colors} from '../../styles/style';
import CheckBox from 'react-native-check-box';

export const DropDownRenderItem = ({data, onSelect, checkBox = false}) => {
  const isChecked = false;
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        paddingHorizontal: wp(2),
        width: '100%',
        paddingVertical: wp(3),
        borderBottomColor: colors.primary,
        borderBottomWidth: wp(0.2),
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text>{data.label}</Text>
      {checkBox && <CheckBox onClick={onSelect} isChecked={isChecked} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({});
