import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  useAnimatedValue,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {colors} from '../styles/style';
import {hp, wp} from '../styles/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const status = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14,
];
const locations = ['Calicut University', 'Malappuram', 'San Francisco'];
const Home = () => {
  const navigation = useNavigation();
  const handleNavigate = shop => {
    navigation.navigate('BillPayment', {
      shop,
    });
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <ScrollView style={styles.statusMainContainer}>
          <View style={styles.contentHeader}>
            {locations.map((loc, i) => (
              <View style={styles.routeContainer}>
                <Text style={styles.routes}>{loc}</Text>
              </View>
            ))}
          </View>
          {status.map((_, i) => (
            <View style={styles.statusParentContainer}>
              <View
                style={[
                  styles.statusLine,
                  {
                    height: status.length - 1 === i ? 0 : '100%',
                    top: i === 0 ? wp(5) : 0,
                  },
                ]}
              />
              <View
                key={i}
                style={[
                  styles.statusContentContainer,
                  {marginTop: i === 0 && wp(5)},
                ]}>
                <View style={styles.statusContainer}></View>
                <Pressable
                  style={styles.statusDescription}
                  onPress={() => handleNavigate(`Shop Name ${i + 1}`)}>
                  <Text style={{color: colors.white, fontSize: wp(3)}}>
                    Shop Name {i + 1}
                  </Text>
                  <View style={styles.rightArrow}>
                    <Entypo
                      name="chevron-small-down"
                      size={wp(6)}
                      color={colors.dark}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: wp(5),
  },
  statusMainContainer: {
    height: hp(80),
    width: '100%',
    // position: 'relative',
  },
  contentHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  routeContainer: {
    // padding: wp(2),
    // width:'100%',
    // paddingHorizontal:wp(2),
    backgroundColor: colors.tertiary,
    borderColor: colors.secondary,
    borderWidth: wp(0.5),
    borderRadius: wp(2),
    marginTop: wp(5),
    // flex:1
  },
  routes: {
    padding: wp(1.6),
    fontSize: wp(3),
    fontFamily: 'Montserrat-Medium',
  },
  contentSection: {
    flex: 1,
  },
  statusParentContainer: {
    position: 'relative',
  },
  statusLine: {
    position: 'absolute',
    zIndex: -10,
    width: wp(1),
    backgroundColor: 'red',
    left: wp(2),
  },
  statusContentContainer: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    // position: 'relative',
    gap: wp(5),
    alignItems: 'flex-start',
    marginBottom: wp(10),
  },
  statusDescription: {
    width: wp(79),
    backgroundColor: colors.secondary,
    padding: wp(2),
    borderRadius: wp(2),
    paddingLeft: wp(5),
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightArrow: {
    transform: [
      {
        rotate: '270deg',
      },
    ],
  },
  statusContainer: {
    width: wp(5),
    height: wp(5),
    backgroundColor: 'red',
    borderRadius: wp(2.5),
    marginBottom: wp(5),
  },
});
