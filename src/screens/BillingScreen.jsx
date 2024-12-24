import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {wp} from '../styles/responsive';
import {colors} from '../styles/style';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const products = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
const BillingScreen = () => {
  const {params} = useRoute();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{params.shop}</Text>
      <View style={styles.formContainer}>
        <Text>Products</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={products}
          labelField="label"
          valueField="value"
          search
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    </View>
  );
};

export default BillingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: wp(5),
    padding: wp(2),
    borderRadius: wp(3),
    backgroundColor: colors.secondary,
  },
  heading: {
    textAlign: 'center',
    fontSize: wp(5),
    fontFamily: 'Montserrat-Medium',
  },
  formContainer: {
    flex: 1,
  },
  //  Dropdown
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
