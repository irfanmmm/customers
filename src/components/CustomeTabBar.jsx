import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {wp} from '../styles/responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/style';

const CustomeTabBar = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="home-outline" size={wp(8)} />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="file-document-outline" size={wp(8)} />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Ionicons name="person-outline" size={wp(8)} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomeTabBar;

const styles = StyleSheet.create({
  mainContainer: {width: '100%', backgroundColor: colors.primary},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(2),
    // paddingHorizontal:0,
    backgroundColor: colors.secondary,
    marginHorizontal: wp(5),
    marginBottom: wp(5),
    borderRadius: wp(5),
    elevation:3
  },
  iconContainer: {
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: wp(1),
  },
});
