import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../styles/style';
import {hp, wp} from '../../styles/responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';

const defaultWidth = wp(15);
const maxWidth = wp(90);
const autoCompleteThreshold = maxWidth * 0.9;

const SlideButton = ({onCompleted}) => {
  const isFocused = useIsFocused();
  const slideAnim = useRef(new Animated.Value(defaultWidth)).current;
  const [isCompleted, setIsCompleted] = useState(false);

  const slideOpacity = slideAnim.interpolate({
    inputRange: [defaultWidth, maxWidth],
    outputRange: [0.3, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    setIsCompleted(false);
    slideAnim.setValue(defaultWidth);
  }, [isFocused]);

  const slideToRight = event => {
    if (isCompleted) return;
    const newWidth = Math.max(
      defaultWidth,
      Math.min(maxWidth, event.nativeEvent.locationX),
    );
    slideAnim.setValue(newWidth);

    if (newWidth >= autoCompleteThreshold) {
      Animated.timing(slideAnim, {
        toValue: maxWidth,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: defaultWidth,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.arrow,
          {
            width: slideAnim,
            opacity: slideOpacity,
          },
        ]}
        onStartShouldSetResponder={() => true}
        onResponderMove={slideToRight}
        onResponderRelease={() => {
          if (isCompleted) return;
          if (slideAnim._value >= maxWidth - 10) {
            console.log('Slide confirmed');
            // setIsCompleted(true);
            onCompleted(true);
          } else {
            Animated.timing(slideAnim, {
              toValue: defaultWidth,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }
        }}>
        <AntDesign
          style={{
            textAlign: 'right',
          }}
          name="doubleright"
          color={colors.dark}
          size={wp(6)}
        />
      </Animated.View>

      <Text style={styles.text}>Slide To Confirm</Text>
    </View>
  );
};

export default SlideButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.textOrange,
    borderRadius: wp(2),
    elevation: 10,
    marginBottom: hp(13),
  },

  text: {
    fontFamily: 'Montserrat-Bold',
    padding: wp(3),
    fontSize: wp(4),
    textAlign: 'center',
    position: 'relative',
    zIndex: 0,
  },
  arrow: {
    position: 'absolute',
    zIndex: 10,
    left: wp(0),
    top: 0,
    padding: wp(3.1),
    backgroundColor: colors.tertiary,
    opacity: 0.3,
    borderRadius: wp(2),
  },

  lottie: {
    width: '100%',
    height: '100%',
  },
});
