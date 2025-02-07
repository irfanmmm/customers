import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigationState} from '@react-navigation/native';
import {wp} from '../styles/responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/style';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';
import {ProductContext} from '../../App';

const CustomTabBar = props => {
  const {currentTab, setCurrentTab, setClareData} = useContext(ProductContext);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const onPress = routeName => {
    let prevState =
      props.navigation.getState().routes[props.navigation.getState().index]
        .name;
    if (prevState === 'BillPayment') {
      setCurrentTab({
        type: 'Prevent',
        route: routeName,
      });
    } else if (prevState === 'ReportScreen') {
      setCurrentTab({
        type: 'Prevent',
        route: routeName,
      });
    } else {
      setCurrentTab({
        type: 'Continue',
        route: routeName,
      });
      props.navigation.navigate(routeName);
      
    }
  };
  return (
    <View
      style={[
        styles.mainContainer,
        keyboardVisible ? {bottom: -wp(50)} : {bottom: 0},
      ]} // Adjust margin when keyboard is visible
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => onPress(props.state.routes[0].name)}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="home-outline"
              size={wp(8)}
              color={props.state.index === 0 ? colors.gradient[1] : colors.dark}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.iconContainer}
          onPress={() => onPress(props.state.routes[1].name)}>
          <View
            style={[
              styles.iconMiddle,
              {
                backgroundColor:
                  props.state.index === 1 || props.state.index === 3
                    ? colors.gradient[0]
                    : colors.textOrange,
              },
            ]}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={wp(12)}
              color={
                props.state.index === 1 || props.state.index === 3
                  ? colors.primary
                  : colors.dark
              }
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.iconContainer}
          onPress={() => onPress(props.state.routes[2].name)}>
          <View style={styles.icon}>
            <Ionicons
              name="person-outline"
              size={wp(8)}
              color={props.state.index === 2 ? colors.gradient[1] : colors.dark}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  mainContainer: {width: '100%', position: 'absolute', bottom: 0, zIndex: 10},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(1.5),
    backgroundColor: colors.secondary,
    marginHorizontal: wp(5),
    marginBottom: wp(5),
    borderRadius: wp(5),
    elevation: 3,
  },
  iconContainer: {
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: wp(1),
  },
  iconMiddle: {
    backgroundColor: colors.textOrange,
    zIndex: 10,
    borderRadius: wp(10),
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(18),
    height: wp(18),
    position: 'absolute',
  },
});
