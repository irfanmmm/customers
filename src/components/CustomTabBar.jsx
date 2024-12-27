import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {wp} from '../styles/responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/style';
import {useNavigation} from '@react-navigation/native'

const CustomTabBar = (props) => {

  const onPress = (routeName)=>{
    props.navigation.navigate(routeName);  
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Pressable style={styles.iconContainer} onPress={()=>onPress(props.state.routes[0].name)}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="home-outline" size={wp(8)} color={props.state.index === 0 ? colors.gradient[1] : colors.dark} />
          </View>
        </Pressable>
        <Pressable style={styles.iconContainer} onPress={()=>onPress(props.state.routes[1].name)}>
          <View style={[styles.iconMiddle, {
            backgroundColor:props.state.index === 1 ||props.state.index === 3  ? colors.gradient[0] : colors.textOrange
          }]}>
            <MaterialCommunityIcons name="file-document-outline" size={wp(12)} color={props.state.index === 1 ||props.state.index === 3 ? colors.primary : colors.dark} />
          </View>
        </Pressable>
        <Pressable style={styles.iconContainer} onPress={()=>onPress(props.state.routes[2].name)}>
          <View style={styles.icon}>
            <Ionicons name="person-outline" size={wp(8)} color={props.state.index === 2 ? colors.gradient[1] : colors.dark} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  mainContainer: {width: '100%', position: 'absolute', bottom: 0},
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
