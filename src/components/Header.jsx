import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../styles/responsive';
import {colors} from '../styles/style';
import Icone from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Header = ({backButton = false, title = ''}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {!backButton ? (
        <>
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
        </>
      ) : (
        <View style={styles.backButtonContainer}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Icone size={wp(6)} name="arrowleft" />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.secondary,
    padding: wp(5),
    paddingVertical: wp(1.5),
    paddingTop:hp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: wp(3),
    // shadowColor:colors.secondary,
    elevation: 10,
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp(4),
    gap: wp(5),
  },
  title: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
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
    borderColor: colors.tertiary,
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
