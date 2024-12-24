import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {wp} from '../styles/responsive';
import {colors} from '../styles/style';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          resizeMode="contain"
          style={styles.profileImage}
          source={require('./../assets/images/1.png')}
        />
      </View>
      <View style={styles.userDetailsContainer}>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.userRole}>Admin</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: wp(5),
    paddingVertical: wp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: wp(3),
    // shadowColor:colors.secondary,
    elevation: 10,
  },
  profile: {
    padding: wp(0.7),
    width: wp(15),
    height: wp(15),
    backgroundColor: 'red',
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp(0.7),
    borderColor: colors.secondary,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userDetailsContainer: {
    flex: 1,
  },
  username: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Bold',
  },
  userRole: {
    fontFamily: 'Montserrat-Regular',
  },
});
