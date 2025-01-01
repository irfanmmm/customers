import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  useAnimatedValue,
  BackHandler,
} from 'react-native';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import {colors} from '../styles/style';
import {hp, wp} from '../styles/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const status = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14,
];
const locations = ['Calicut University', 'Malappuram', 'San Francisco'];
const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
      });
      return () => {
        BackHandler.removeEventListener('hardwareBackPress');
      };
    }, [isFocused]);

  const handleNavigate = shop => {
    navigation.navigate('BillPayment', {
      shop,
    });
  };


  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.statusMainContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.contentHeader}>
            <View style={styles.routeContainer}>
              <Ionicons
                style={styles.icon}
                color={colors.primary}
                name="location-outline"
                size={wp(5)}
              />
              <Text
                style={{
                  marginRight: 'auto',
                  marginLeft: wp(2),
                  color: colors.primary,
                  fontFamily: 'Montserrat-Bold',
                  fontSize: wp(4),
                }}>
                {locations[0]}
              </Text>
            </View>
          </View>
          {status.map((_, i) => (
            <View
              key={i}
              style={[
                styles.statusParentContainer,
                {marginBottom: status.length - 1 === i ? hp(10) : 0},
              ]}>
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
                style={[
                  styles.statusContentContainer,
                  {marginTop: i === 0 && wp(5)},
                ]}>
                <View style={styles.statusContainer}></View>
                <Pressable
                  style={styles.statusDescription}
                  onPress={() => handleNavigate(`Shop Name ${i + 1}`)}>
                  <Entypo style={styles.icon} name="shop" size={20} />
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: wp(3),
                      marginRight: 'auto',
                      marginLeft: wp(2),
                    }}>
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
        {/* <Pressable>
          <LottieView
            style={styles.lottieView}
            source={require('./../assets/lottiefiles/animatedNots.json')}
            autoPlay
            loop
          />
        </Pressable> */}
      </View>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: colors.primary,
  },
  statusMainContainer: {
    height: hp(80),
    width: '100%',
    paddingHorizontal: wp(5),
    // position: 'relative',
  },
  contentHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  routeContainer: {
    padding: wp(2),
    width: '100%',
    // paddingHorizontal:wp(2),
    backgroundColor: colors.primaryGreen,
    borderColor: colors.secondary,
    borderWidth: wp(0.5),
    borderRadius: wp(2),
    marginTop: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
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
    width: wp(0.6),
    backgroundColor: colors.textOrange,
    left: wp(1.8),
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
    backgroundColor: colors.textOrange,
    padding: wp(2),
    borderRadius: wp(2),
    paddingLeft: wp(5),
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightArrow: {
    transform: [
      {
        rotate: '270deg',
      },
    ],
  },
  statusContainer: {
    width: wp(4),
    height: wp(4),
    backgroundColor: colors.textOrange,
    borderRadius: wp(2.5),
    marginBottom: wp(5),
  },
  lottieView: {
    position: 'absolute',
    width: '100%',
    height: wp(20),
    right: -wp(35),
    bottom: hp(10),
    zIndex: 50,
  },
});
