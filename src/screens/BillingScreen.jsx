import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {hp, wp} from '../styles/responsive';
import {colors} from '../styles/style';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {useAxios} from '../hooks/useAxios';
import {GET_PRODUCTS, GET_ROUTE} from '../config/urls';
import {ProductContext} from '../../App';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';
import {
  ALERT_TYPES,
  AlertService,
} from '../components/CustomeAlert/CustomeAlert';

const BillingScreen = () => {
  const isFocused = useIsFocused();
  const {fetchData} = useAxios();

  const {params} = useRoute();
  const scrollViewRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [addBrand, setAddBrand] = useState(0);
  const [addProduct, setAddProduct] = useState(0);

  const [route, setRoute] = useState([{label: 'Select Location', value: '0'}]);
  const [shop, setShop] = useState([{label: 'Select Shop', value: '0'}]);

  const [brand, setBrand] = useState([{label: 'Select Brand', value: '0'}]);
  const [products, setProducts] = useState([
    {label: 'Select Product', value: '0'},
  ]);
  const [selectRoute, setSelectRoute] = useState(0);
  const [selectShop, setSelectShop] = useState({
    value: 0,
  });

  const {
    setCurrenProducts,
    currentTab,
    setCurrentTab,
    clareData,
    setClareData,
  } = useContext(ProductContext);

  const navigation = useNavigation();

  const fetchLocationsAndShops = async () => {
    return await fetchData({
      url: GET_ROUTE,
    });
  };

  useEffect(() => {
    if (currentTab.type === 'Prevent') {
      AlertService.show({
        type: ALERT_TYPES.WARNING,
        title: 'Warning',
        message: 'Are you sure to exit ?',
        onConfirm: () => {
          setClareData(true);
          navigation.navigate(currentTab.route);
          setCurrentTab({
            type: 'Continue',
            route: currentTab.route,
          });
          
        },
        onCancel: () => {
          console.log('cancel clicked');
        },
      });
    }
  }, [currentTab]);

  useEffect(() => {
    if (params?.route && params?.shop) {
      let {route, routeId} = params.route;

      setRoute([
        {
          label: route,
          value: routeId,
        },
      ]);

      setSelectRoute(routeId);

      let {shopname, id, status} = params.shop;
      setShop([
        {
          label: shopname,
          value: id,
          shopStatus: status,
        },
      ]);
      setSelectShop({
        value: id,
        shopStatus: status,
      });
    } else {
      fetchLocationsAndShops()
        .then(response => {
          if (response?.statusCode === 6000) {
            let route = response?.assignedroute?.map(v => ({
              label: v?.route,
              value: v?.routeId,
              shops: v?.shops?.map(v2 => ({
                label: v2?.shopname,
                value: v2?.id,
                shopStatus: v2?.shopStatus,
              })),
            }));
            setRoute(route);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    // to fetch products from the api
    getProducts()
      .then(response => {
        if (response.statusCode === 6000) {
          const brands = response.productlist.map(brand => ({
            label: brand?.category,
            value: brand?.categoryId,
            products: brand?.products,
          }));
          setBrand(brands);
        }
      })
      .catch(console.log);
  }, [isFocused]);

  useEffect(() => {
    if (clareData) {
      setAddBrand(0);
      setAddProduct(0);
      setSelectRoute(0);
      setSelectShop({
        value: 0,
      });
      setSelectedValues([]);
    }
  }, [clareData]);

  const getProducts = async () => {
    return await fetchData({
      url: GET_PRODUCTS,
    });
  };

  const handleNavigateToReportScreen = () => {
    if (selectShop?.shopStatus) return;
    if (route[0].label === 'Select Location') {
      AlertService.show({
        type: ALERT_TYPES.WARNING,
        title: 'Warning',
        message: 'Please Select Location ',
        onConfirm: () => {},
        onCancel: () => {
          console.log('cancel clicked');
        },
      });
      return;
    } else if (shop[0].label === 'Select Shop') {
      AlertService.show({
        type: ALERT_TYPES.WARNING,
        title: 'Warning',
        message: 'Please Select Shop ',
        onConfirm: () => {},
        onCancel: () => {
          console.log('cancel clicked');
        },
      });
      return;
    } else if (addBrand === 0) {
      AlertService.show({
        type: ALERT_TYPES.WARNING,
        title: 'Warning',
        message: 'Please Select Brand ',
        onConfirm: () => {},
        onCancel: () => {
          console.log('cancel clicked');
        },
      });
      return;
    } else if (addProduct === 0) {
      AlertService.show({
        type: ALERT_TYPES.WARNING,
        title: 'Warning',
        message: 'Please Select Products ',
        onConfirm: () => {},
        onCancel: () => {
          console.log('cancel clicked');
        },
      });
      return;
    } else if (
      selectedValues.length === 0 ||
      selectedValues.find(
        v =>
          v.qty == '' ||
          v.qty == '0' ||
          v.qty == undefined ||
          v.qty == NaN ||
          v.qty == null,
      )
    ) {
      AlertService.show({
        type: ALERT_TYPES.WARNING,
        title: 'Warning',
        message: 'Please fill the quantity of products ',
        onConfirm: () => {},
        onCancel: () => {
          console.log('cancel clicked');
        },
      });
      return;
    }

    setCurrenProducts({selectedValues, selectShop, selectRoute});
    navigation.navigate('ReportScreen');
    setClareData(false);
  };

  return (
    <AlertNotificationRoot>
      <LinearGradient style={{flex: 1}} colors={colors.gradient}>
        <ScrollView
          style={styles.container}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}>
          <Header
            backButton
            title="Bill Payment"
            onPress={() => {
              AlertService.show({
                type: ALERT_TYPES.WARNING,
                title: 'Warning',
                message: 'Are you sure to exit ?',
                onConfirm: () => {
                  navigation.goBack();
                  // to clear all data
                  setClareData(true);
                },
                onCancel: () => {
                  console.log('cancel clicked');
                },
              });
            }}
          />
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
                disable={params?.shop ? true : false}
                // activeColor={colors.}
                data={route}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                value={selectRoute}
                onChange={item => {
                  setSelectRoute(item.value);
                  setShop(item.shops);
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
                data={shop}
                // disable={params?.shop ? true : false}
                disable={
                  shop.length === 0
                    ? true
                    : shop[0].label === 'Select Shop'
                    ? true
                    : false
                }
                labelField="label"
                valueField="value"
                search
                searchPlaceholder="Search..."
                value={selectShop?.value}
                onChange={item => {
                  setSelectShop(item);
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
              <View style={styles.billingFormContainer}>
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
                    data={brand}
                    labelField="label"
                    valueField="value"
                    search
                    searchPlaceholder="Search..."
                    value={addBrand}
                    onChange={item => {
                      setAddBrand(item.value);
                      let products = item?.products?.map(product => ({
                        label: product?.productName,
                        value: product?.id,
                        isChecked: false,
                        productDetails: product,
                        brandLabel: item.label,
                        brandValue: item.value,
                      }));

                      setProducts(products);
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
                  <Text style={[styles.billingLabel]}>Product</Text>
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
                    placeholder="Select Product"
                    data={products}
                    labelField="label"
                    valueField="value"
                    disable={
                      products.length === 0
                        ? true
                        : products[0].label === 'Select Product'
                        ? true
                        : false
                    }
                    search
                    searchPlaceholder="Search..."
                    value={addProduct}
                    onChange={item => {
                      setAddProduct(item.value);

                      // Merge item with its productDetails
                      let newItem = {
                        ...item,
                        ...item?.productDetails,
                      };

                      setSelectedValues(prev => {
                        const existingProductIndex = prev.findIndex(
                          v => v.value === item.value,
                        );

                        if (existingProductIndex > -1) {
                          const updatedProduct = {
                            ...prev[existingProductIndex],
                            qty: (prev[existingProductIndex].qty || 0) + 1,
                          };
                          return [
                            ...prev.slice(0, existingProductIndex),
                            updatedProduct,
                            ...prev.slice(existingProductIndex + 1),
                          ];
                        }
                        return [...prev, {...newItem, qty: 1}];
                      });
                      setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                      <Image
                        style={styles.prefixIcon}
                        source={require('./../assets/images/brand.png')}
                      />
                    )}
                  />
                  {selectedValues.map((item, index) => (
                    <View style={styles.selectedItemContainer} key={index}>
                      <View style={styles.selectdItemFormContainer}>
                        <View
                          style={{
                            width: '50%',
                          }}>
                          <Text
                            style={{
                              color: colors.gradient[1],
                              fontFamily: 'Montserrat-Bold',
                              fontSize: wp(2.5),
                              lineHeight: wp(3),
                              paddingBottom: wp(1),
                            }}>
                            {item?.brandLabel}
                          </Text>
                          <Text
                            style={styles.itemLable}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {item.label}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '50%',
                            flexDirection: 'row',
                            gap: wp(2),
                          }}>
                          <View>
                            <Text style={styles.selectItemLabel}>Quantity</Text>

                            <TextInput
                              style={styles.selectItemInput}
                              placeholder="Quty"
                              value={selectedValues[index].qty.toString()}
                              onChangeText={text => {
                                setSelectedValues(prev => {
                                  const updatedValues = [...prev];
                                  if (updatedValues[index]) {
                                    updatedValues[index] = {
                                      ...updatedValues[index],
                                      qty:
                                        text.length === 0 ||
                                        text === ',' ||
                                        text === '-' ||
                                        text === '.' ||
                                        text === ' '
                                          ? ''
                                          : parseInt(text),
                                    };
                                  }
                                  return updatedValues;
                                });
                              }}
                              keyboardType="number-pad"
                            />
                          </View>
                          <View>
                            <Text style={styles.selectItemLabel}>Price</Text>
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
                              editable={false}
                              value={(
                                item?.mrp * selectedValues[index].qty
                              ).toString()}
                              keyboardType="number-pad"
                              placeholderTextColor="gray"
                            />
                          </View>
                        </View>
                      </View>
                      <Pressable
                        onPress={() => {
                          setSelectedValues(prev =>
                            prev.filter((_, i) => i !== index),
                          );
                        }}>
                        <AntDesign size={wp(4)} name="closecircleo" />
                      </Pressable>
                    </View>
                  ))}
                </View>
              </View>

              <Pressable
                style={[
                  styles.submitButton,
                  {
                    opacity: selectShop?.shopStatus ? 0.5 : 1,
                  },
                ]}
                onPress={handleNavigateToReportScreen}>
                <Text style={styles.submitText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </AlertNotificationRoot>
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
    color: colors.dark,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp(3),
    lineHeight: wp(3),
    paddingBottom: wp(1),
  },
  selectItemLabel: {
    position: 'absolute',
    top: -wp(1.8),
    left: wp(2),
    backgroundColor: colors.primary,
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
    backgroundColor: colors.tertiary,

    marginBottom: hp(10),
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
