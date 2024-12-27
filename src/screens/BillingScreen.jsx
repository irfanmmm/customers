import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {hp, wp} from '../styles/responsive';
import {colors} from '../styles/style';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box';
import {DropDownRenderItem} from '../components/DropDown/DropDownRenderItem';

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
  const navigation = useNavigation();
  const {params} = useRoute();
  const scrollViewRef = useRef(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [addBrand, setAddBrand] = useState(1);

  const selectProducts = items => {
    setSelectedValues(items);
  };

  const addNewForm = () => {
    // scrollViewRef.current.scrollTo({y: 0, animated: true});
    setAddBrand(prev => prev + 1);
  };

  const handleNavigateToReportScreen = () => {
    navigation.navigate('ReportScreen');
  };

  return (
    <LinearGradient style={{flex: 1}} colors={colors.gradient}>
      <ScrollView
        style={styles.container}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}>
        <Header backButton title="Bill Payment" />
        <View style={styles.formContainer}>
          <View style={styles.locationShopDropDownContainer}>
            <Text style={styles.label}>Location</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={{
                borderRadius: wp(2),
                backgroundColor: colors.secondary,
              }}
              itemContainerStyle={{
                borderBottomColor: colors.primary,
                borderBottomWidth: wp(0.2),
                paddingHorizontal: wp(2),
              }}
              iconStyle={[styles.iconStyle, {tintColor: colors.primary}]}
              fontFamily="Montserrat-Medium"
              placeholder="Select Rote"
              // activeColor={colors.}
              data={products}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <Ionicons
                  style={styles.icon}
                  color={colors.primary}
                  name="location-outline"
                  size={20}
                />
              )}
            />
          </View>
          <View style={styles.locationShopDropDownContainer}>
            <Text style={[styles.label]}>Shop</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={{
                borderRadius: wp(2),
                backgroundColor: colors.secondary,
              }}
              inputSearchStyle={[
                styles.inputSearchStyle,
                {
                  borderRadius: wp(2),
                  borderColor: colors.primary,
                },
              ]}
              itemContainerStyle={{
                borderBottomColor: colors.primary,
                borderBottomWidth: wp(0.2),
                paddingHorizontal: wp(2),
              }}
              iconStyle={[styles.iconStyle, {tintColor: colors.primary}]}
              fontFamily="Montserrat-Medium"
              placeholder="Select Shop"
              // activeColor={colors.}
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
                <Entypo
                  style={styles.icon}
                  color={colors.primary}
                  name="shop"
                  size={20}
                />
              )}
            />
          </View>

          <View style={styles.billingFormSection}>
            {Array.from({length: addBrand}).map((_, i) => (
              <View
                style={[
                  styles.billingFormContainer,
                  {height: addBrand - 1 !== i && hp(5)},
                ]}>
                <View style={styles.billFormHeadder}>
                  <Text style={styles.billingFormTitle}>Ser No : {i + 1}</Text>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={wp(5)}
                    color={colors.dark}
                  />
                </View>

                {addBrand - 1 === i && (
                  <>
                    <View style={styles.billingDropDownContainer}>
                      <Text style={[styles.billingLabel]}>Brand</Text>
                      <Dropdown
                        style={[
                          styles.billingDropdown,
                          isFocus && {borderColor: colors.secondary},
                        ]}
                        placeholderStyle={[
                          styles.placeholderStyle,
                          {color: colors.dark},
                        ]}
                        selectedTextStyle={[
                          styles.selectedTextStyle,
                          {color: colors.dark},
                        ]}
                        containerStyle={{
                          borderRadius: wp(2),
                          backgroundColor: colors.secondary,
                        }}
                        inputSearchStyle={[
                          styles.inputSearchStyle,
                          {
                            borderRadius: wp(2),
                            borderColor: colors.primary,
                          },
                        ]}
                        itemContainerStyle={{
                          borderBottomColor: colors.primary,
                          borderBottomWidth: wp(0.2),
                          paddingHorizontal: wp(2),
                        }}
                        iconStyle={[styles.iconStyle, {tintColor: colors.dark}]}
                        fontFamily="Montserrat-Medium"
                        placeholder="Select Brand"
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
                          <Image
                            style={styles.prefixIcon}
                            source={require('./../assets/images/brand.png')}
                          />
                        )}
                      />
                    </View>
                    <View style={styles.billingDropDownContainer}>
                      <Text style={[styles.billingLabel]}>Products</Text>
                      <MultiSelect
                        style={[
                          styles.billingDropdown,
                          isFocus && {
                            borderColor: colors.secondary,
                          },
                        ]}
                        placeholderStyle={[
                          styles.placeholderStyle,
                          {color: colors.dark},
                        ]}
                        selectedTextStyle={[
                          styles.selectedTextStyle,
                          {color: colors.dark},
                        ]}
                        containerStyle={{
                          borderRadius: wp(2),
                          backgroundColor: colors.secondary,
                        }}
                        searchPlaceholderTextColor={colors.dark}
                        inputSearchStyle={[
                          styles.inputSearchStyle,
                          {
                            borderRadius: wp(2),
                            borderColor: colors.primary,
                          },
                        ]}
                        iconStyle={[styles.iconStyle, {tintColor: colors.dark}]}
                        fontFamily="Montserrat-Medium"
                        placeholder="Select Products"
                        // activeColor={colors.}
                        data={products}
                        labelField="label"
                        valueField="value"
                        search
                        searchPlaceholder="Search..."
                        // value={value}
                        multiple={true}
                        closeOnSelect={false}
                        open={isFocus}
                        setOpen={setIsFocus}
                        value={selectedValues}
                        onChange={selectProducts}
                        items={products}
                        renderLeftIcon={() => (
                          <Image
                            style={styles.prefixIcon}
                            source={require('./../assets/images/package.png')}
                          />
                        )}
                        renderSelectedItem={(item, unSelect) => (
                          <View style={styles.selectedItemContainer}>
                            <View style={styles.selectdItemFormContainer}>
                              <Text
                                style={styles.itemLable}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {item.label}
                              </Text>
                              <View
                                style={{
                                  width: '50%',
                                  flexDirection: 'row',
                                  gap: wp(2),
                                }}>
                                <View>
                                  <Text style={styles.selectItemLabel}>
                                    Quantity
                                  </Text>

                                  <TextInput
                                    style={styles.selectItemInput}
                                    placeholder="Quty"
                                    value={'100'}
                                    keyboardType="number-pad"
                                  />
                                </View>
                                <View>
                                  <Text style={styles.selectItemLabel}>
                                    Price
                                  </Text>
                                  <Image
                                    style={{
                                      width: wp(5),
                                      height: wp(5),
                                      position: 'absolute',
                                      left: 0,
                                      top: wp(2),
                                    }}
                                    source={require('./../assets/images/rupee.png')}
                                  />
                                  <TextInput
                                    style={[
                                      styles.selectItemInput,
                                      {paddingLeft: wp(4)},
                                    ]}
                                    placeholder="Price"
                                    textAlign="left"
                                    value={'1000000'}
                                    keyboardType="number-pad"
                                    placeholderTextColor="gray"
                                  />
                                </View>
                              </View>
                            </View>
                            <Pressable
                              onPress={() => unSelect && unSelect(item)}>
                              <AntDesign size={wp(4)} name="closecircleo" />
                            </Pressable>
                          </View>
                        )}
                        renderItem={item => {
                          return (
                            <DropDownRenderItem
                              data={item}
                              checkBox
                              onSelect={() => {}}
                            />
                          );
                        }}
                      />
                    </View>
                  </>
                )}
              </View>
            ))}
            <TouchableOpacity style={styles.addNewProduct} onPress={addNewForm}>
              <Text style={styles.addNotherBrand}>Add Another Brand</Text>
              <View style={styles.addIcon}>
                <Ionicons name="add" size={wp(5)} color={colors.gradient[1]} />
              </View>
            </TouchableOpacity>
            <Pressable
              style={styles.submitButton}
              onPress={handleNavigateToReportScreen}>
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default BillingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: hp(20),
    // backgroundColor: colors.primary,
  },
  heading: {
    marginTop: wp(5),
    textAlign: 'center',
    fontSize: wp(5),
    fontFamily: 'Montserrat-Medium',
  },
  formContainer: {
    flex: 1,
    margin: wp(5),
  },
  //  Dropdown
  dropdown: {
    marginTop: wp(2),
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: wp(5),
    position: 'relative',
  },
  icon: {
    marginRight: 5,
  },
  locationShopDropDownContainer: {
    position: 'relative',
    marginBottom: wp(5),
  },
  label: {
    position: 'absolute',
    fontFamily: 'Montserrat-Medium',
    left: wp(5),
    top: -wp(0.5),
    zIndex: 999,
    paddingHorizontal: wp(1),
    fontSize: wp(3),
    backgroundColor: '#4c8479',
    // padding:2,
    color: colors.primary,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.primary,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.primary,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  prefixIcon: {
    width: wp(7),
    height: wp(7),
    marginLeft: -wp(2),
    marginRight: wp(1),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(2),
  },
  selectedItemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  // billing form
  billingFormSection: {},
  billingFormContainer: {
    marginBottom: wp(2),
    backgroundColor: colors.textOrange,
    width: '100%',
    padding: wp(2),
    borderRadius: wp(2),
    marginBottom: wp(5),
    overflow: 'hidden',
    position: 'relative',
  },
  billFormHeadder: {
    flexDirection: 'row',
    paddingRight: wp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billingFormTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3),
  },
  billingDropDownContainer: {
    marginTop: wp(2),
    position: 'relative',
  },
  billingLabel: {
    position: 'absolute',
    left: wp(5),
    top: -wp(1),
    backgroundColor: colors.textOrange,
    zIndex: 10,
    padding: 1,
  },
  billingDropdown: {
    marginTop: wp(2),
    height: 50,
    borderColor: colors.primary,
    borderWidth: wp(0.2),
    borderRadius: 8,
    paddingHorizontal: wp(5),
    position: 'relative',
  },
  selectdItemFormContainer: {
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLable: {
    width: '50%',
  },
  selectItemLabel: {
    position: 'absolute',
    top: -wp(1.8),
    left: wp(2),
    backgroundColor: 'white',
    paddingHorizontal: wp(0.2),
    zIndex: 5,
    fontSize: wp(3),
  },
  selectItemInput: {
    width: wp(20),
    position: 'relative',
    // left: 0,
    borderWidth: wp(0.2),
    borderRadius: wp(1),
    padding: wp(2),

    color: colors.dark,
  },
  addNewProduct: {
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: wp(2),
  },
  addNotherBrand: {
    fontSize: wp(3),
    fontFamily: 'Montserrat-Medium',
    color: colors.primary,
  },
  addIcon: {
    padding: wp(2),
    backgroundColor: colors.tertiary,
    borderRadius: wp(10),
    // width:wp(10),
    // height:wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    marginBottom: hp(10),
    backgroundColor: colors.tertiary,
    elevation: 5,
    borderRadius: wp(2),
    marginTop: wp(5),
    paddingVertical: hp(2),
  },
  submitText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
});
