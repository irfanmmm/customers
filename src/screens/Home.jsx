import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {colors} from '../styles/style';
import {hp, wp} from '../styles/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  useIsFocused,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useAxios} from '../hooks/useAxios';
import {GET_PROFILE, GET_ROUTE} from '../config/urls';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';
import {
  ALERT_TYPES,
  AlertService,
} from '../components/CustomeAlert/CustomeAlert';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const navigationState = useNavigationState(state => state);

  const [profileDetails, setProfileDetails] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [rootsAndShops, setRootsAndShops] = useState(null);
  const [iseVisibleShops, setIsVisibleShops] = useState({
    isVisible: false,
    index: 0,
  });
  const [refresh, setRefresh] = useState(false);
  const {fetchData, loading} = useAxios();

  const fetchLocationsAndShops = async () => {
    return await fetchData({
      url: GET_ROUTE,
    });
  };

  const fetchProfileDetails = async () => {
    return await fetchData({
      url: GET_PROFILE,
    });
  };

  const handleBackPress = () => {
    const currentRoute = navigationState?.routes[navigationState.index];

    if (currentRoute?.name === 'Home') {
      BackHandler.exitApp();
      return true;
    } else if (currentRoute?.name === 'ReportScreen') {
      if (isCompleted) {
        navigation.goBack();
      } else {
        navigation.navigate('BillPayment');
      }
      return true;
    } else if (currentRoute?.name === 'BillPayment') {
      AlertService.show({
        type: ALERT_TYPES.WARNING,
        title: 'Warning',
        message: 'Are you sure to exit ?',
        onConfirm: () => {
          navigation.goBack();
          setClareData(true);
        },
        onCancel: () => {
          console.log('cancel clicked');
        },
      });
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigationState]);

  useEffect(() => {
    /* fetch locations and shops */
    fetchLocationsAndShops()
      .then(response => {
        if (response?.statusCode === 6000) {
          console.log(response?.assignedroute);

          setRootsAndShops(response?.assignedroute);
          if (
            response?.assignedroute.length === 2 ||
            response?.assignedroute.length === 1
          ) {
            setIsVisibleShops({
              isVisible: true,
              index: 0,
            });
          }
        } else {
          AlertService.show({
            type: ALERT_TYPE.WARNING,
            title: 'Warning',
            message: response.message,
            onConfirm: () => {
              BackHandler.exitApp();
            },
            onCancel: () => {
              console.log('cancel clicked');
            },
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    /* fetch profile details */
    fetchProfileDetails()
      .then(response => {
        if (response.statusCode === 6000) {
          setProfileDetails(response?.employeeinfo);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [isFocused, refresh]);

  const handleNavigate = (route, shop, status = false) => {
    if (!status) {
      setIsCompleted(false);
      navigation.navigate('BillPayment', {
        shop,
        route,
        status,
      });
    } else {
      setIsCompleted(true);
      navigation.navigate('ReportScreen', {
        shop,
        route,
        status,
      });
    }
  };

  if (loading)
    return (
      <LinearGradient
        colors={colors.lightGradient}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 500,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255,0.8)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={colors.dark} />
      </LinearGradient>
    );

  return (
    <AlertNotificationRoot>
      <LinearGradient colors={colors.gradient} style={styles.container}>
        <Header
          username={profileDetails?.name}
          userRole={profileDetails?.roleType}
        />
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.statusMainContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => {
                  setRefresh(true);
                  setTimeout(() => {
                    setRefresh(false);
                  }, 1000);
                }}
              />
            }>
            {rootsAndShops?.map((route, index) => (
              <>
                <Pressable
                  style={[
                    styles.contentHeader,
                    {
                      marginBottom:
                        rootsAndShops?.length - 1 === index ? hp(15) : 0,
                    },
                  ]}
                  key={index}
                  onPress={() => {
                    setIsVisibleShops({
                      index,
                      isVisible: true,
                    });
                  }}>
                  <View
                    style={[
                      styles.routeContainer,
                      {
                        borderColor:
                          iseVisibleShops.index === index
                            ? colors.textOrange
                            : colors.secondary,
                        backgroundColor:
                          iseVisibleShops.index === index
                            ? colors.gradient[1]
                            : colors.primaryGreen,
                      },
                    ]}>
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
                      {route?.route}
                    </Text>
                  </View>
                </Pressable>
                {iseVisibleShops.isVisible &&
                  iseVisibleShops.index === index &&
                  route?.shops?.map((shop, i) => (
                    <View
                      key={i}
                      style={[
                        styles.statusParentContainer,
                        {
                          marginTop:
                            i === 0 && rootsAndShops?.length - 1 === index
                              ? -hp(15)
                              : 0,
                          marginBottom:
                            route?.shops?.length - 1 === i &&
                            rootsAndShops?.length - 1 === index
                              ? hp(10)
                              : 0,
                        },
                      ]}>
                      <View
                        style={[
                          styles.statusLine,
                          {
                            height: route?.shops?.length - 1 === i ? 0 : '100%',
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
                          style={[styles.statusDescription]}
                          onPress={() =>
                            handleNavigate(route, shop, shop.shopStatus)
                          }>
                          <Entypo style={styles.icon} name="shop" size={20} />
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: wp(3),
                              marginRight: 'auto',
                              marginLeft: wp(2),
                            }}>
                            {shop?.shopname}
                          </Text>
                          {shop.shopStatus && (
                            <Ionicons
                              name="checkmark-circle-sharp"
                              size={wp(6)}
                              color={colors.primaryGreen}
                            />
                          )}
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
              </>
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
    </AlertNotificationRoot>
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
    backgroundColor: colors.secondary,
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
