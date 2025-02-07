import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import Header from '../components/Header';
import {wp} from '../styles/responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {useAxios} from '../hooks/useAxios';
import {GET_PROFILE} from '../config/urls';
import {AlertNotificationRoot} from 'react-native-alert-notification';

const Profile = ({navigation}) => {
  const {data, fetchData, loading} = useAxios();
  const [profile, setProfile] = useState(null);

  const fetProfile = async () => {
    try {
      const response = await fetchData({
        url: GET_PROFILE,
      });
      if (response.statusCode === 6000) {
        setProfile(response.employeeinfo);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetProfile();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    RNRestart.restart();
  };
  return (
    <AlertNotificationRoot>
      <LinearGradient colors={colors.gradient} style={styles.container}>
        <Header backButton title="Profile" onPress={()=>navigation.goBack()} />
        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profile}
              resizeMode="contain"
              source={require('./../assets/images/1.png')}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.details}>
              <Text style={styles.detailTitle}>Name</Text>
              <Text style={styles.detailContent}>{profile?.name}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailTitle}>Phone No</Text>
              <Text style={styles.detailContent}>
                +91 {profile?.phoneNumber}
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailTitle}>Address</Text>
              <Text style={styles.detailContent}>{profile?.address}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailTitle}>Employee Status</Text>
              <Text style={styles.detailContent}>{profile?.roleType}</Text>
            </View>
          </View>
          <Pressable style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
            <MaterialIcons name="logout" size={wp(7)} color={colors.dark} />
          </Pressable>
        </View>
      </LinearGradient>
    </AlertNotificationRoot>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
    width: '100%',
    height: '75%',
    justifyContent: 'space-between',
    // flex: 1,
  },
  profileContainer: {
    width: wp(20),
    height: wp(20),
    alignSelf: 'center',
    backgroundColor: 'red',
    borderRadius: wp(10),
    borderWidth: wp(0.5),
    borderColor: colors.tertiary,
    padding: wp(2),
  },
  profile: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    backgroundColor: colors.tertiary,
    marginTop: wp(5),
    borderRadius: wp(2),
    padding: 5,
  },
  details: {
    marginVertical: wp(2),
    borderColor: colors.dark,
    borderWidth: wp(0.1),
    padding: wp(1),
    paddingLeft: wp(2),
    borderRadius: wp(2),
  },
  detailTitle: {
    fontFamily: 'Montserrat-SemiBold',
    marginTop: wp(1),
  },
  detailContent: {
    fontFamily: 'Montserrat-Medium',
    marginTop: wp(2),
  },
  logoutButton: {
    width: '100%',
    padding: wp(2),
    backgroundColor: colors.textOrange,
    borderRadius: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp(5),
  },
  logoutText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
  },
});
