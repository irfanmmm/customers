import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import {wp} from '../styles/responsive';
import Header from '../components/Header';

const ReportScreen = () => {
  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <Header backButton title="Report" />
      <View style={styles.contentContainer}>
        
      </View>
    </LinearGradient>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: wp(5),
    marginTop: wp(5),
    
  },
});
