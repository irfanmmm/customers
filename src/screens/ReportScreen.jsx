import {ScrollView, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import {hp, wp} from '../styles/responsive';
import Header from '../components/Header';
import SlideButton from '../components/SlideButton/SlideButton';
import LottieView from 'lottie-react-native';
import {useAxios} from '../hooks/useAxios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ProductContext} from '../../App';
import {GET_SAVED_ORDER, SAVE_ORDER} from '../config/urls';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  ALERT_TYPES,
  AlertService,
} from '../components/CustomeAlert/CustomeAlert';

const ReportScreen = ({route}) => {
  if (route?.params) {
    var {shop} = route?.params;
  }

  const lottie = useRef(null);
  const isFocused = useIsFocused();
  const [isCompleted, setIsCompleted] = useState(false);
  const {data, fetchData} = useAxios();
  const [tableRows, setTableRows] = useState([]);
  const [value, setValue] = useState('0');

  const {currenProducts, currentTab, setCurrentTab, setClareData} =
    useContext(ProductContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentTab.type === 'Prevent') {
      AlertService.show({
        type: ALERT_TYPES.WARNING,
        title: 'Warning',
        message: 'Are you sure to exit ?',
        onConfirm: () => {
          navigation.navigate(currentTab.route);
          setCurrentTab({
            type: 'Continue',
            route: currentTab.route,
          });
          setClareData(true);
        },
        onCancel: () => {
          console.log('cancel clicked');
        },
      });
    }
  }, [currentTab]);

  useEffect(() => {
    if (currenProducts) {
      const tableRow = currenProducts?.selectedValues?.map(item => ({
        product: item?.productDetails?.productName,
        productBrand: item?.brandLabel,
        price: item?.productDetails?.mrp,
        qty: item?.qty,
        amount: item?.qty * item?.productDetails?.mrp,
      }));
      setTableRows(tableRow);
      setIsCompleted(false);
    } else {
      viewOrder().then(response => {
        if (response?.statusCode === 6000) {
          const tableRow = response?.productlist?.map(item => ({
            product: item?.productName,
            productBrand: item?.categoryName,
            price: item?.mrp,
            qty: item?.quantity,
            amount: item?.quantity * item?.mrp,
          }));

          setValue((response?.productlist[0]?.discountpercentage).toString());
          setTableRows(tableRow);
        }
      });
    }
  }, [currenProducts, isFocused]);

  const viewOrder = async () => {
    return await fetchData({
      url: `${GET_SAVED_ORDER}/${shop?.shopStatusId}`,
    });
  };

  const totalPrice = tableRows?.reduce((total, row) => total + row.amount, 0);

  const handleSubmit = async () => {
    let productCount = [];
    let totalProducts = currenProducts?.selectedValues?.map(item => {
      productCount.push(item?.productDetails?.id);
      return {
        ProductId: item?.productDetails?.id,
        Quantity: item?.qty,
      };
    });

    try {
      const response = await fetchData({
        url: SAVE_ORDER,
        method: 'POST',
        data: {
          shopId: currenProducts?.selectShop?.value,
          TotalProductsCount: productCount.length,
          Discount: parseInt(value),
          Products: [...totalProducts],
        },
      });
      if (response?.statusCode === 6000) {
        lottie?.current?.play(); // Play the Lottie animation
        setIsCompleted(true); // Show Lottie animation screen
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = text => {
    const num = parseFloat(text, 10);
    if ((num >= 1 && num <= 100) || text === '') {
      setValue(text);
    }
  };

  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      {isCompleted && (
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('./../assets/lottiefiles/confirmAnimation.json')}
            autoPlay={false}
            loop={false}
            onAnimationFinish={() => {
              setIsCompleted(false);
              navigation.navigate('Home');
            }}
            ref={lottie}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      )}
      <Header
        onPress={() => {
          if (shop) {
            navigation.goBack();
          } else {
            navigation.navigate('BillPayment');
          }
        }}
        backButton
        title="Review"
      />

      <ScrollView style={styles.contentContainer}>
        <View
          style={[
            styles.billingContainer,
            {
              marginBottom: shop ? hp(15) : wp(5),
            },
          ]}>
          <Table borderStyle={{borderWidth: 0, borderColor: '#C1C0B9'}}>
            <Row
              data={['Items', 'Qty', 'Rate', 'Amount']}
              flexArr={[2, 1, 1]}
              style={{
                backgroundColor: colors.gradient[0],
                padding: wp(2),
                borderTopStartRadius: wp(2),
                borderTopEndRadius: wp(2),
              }}
              textStyle={{
                fontSize: wp(3),
                color: colors.primary,
                fontFamily: 'Montserrat-Bold',
              }}
            />

            {tableRows.map((item, i) => (
              <Rows
                data={[
                  [
                    <View
                      style={{
                        width: wp(25),
                        padding: wp(2),
                      }}>
                      <Text
                        style={{
                          color: colors.gradient[1],
                          fontFamily: 'Montserrat-Bold',
                          fontSize: wp(2.5),
                          lineHeight: wp(3),
                          paddingBottom: wp(1),
                        }}>
                        {item?.productBrand}
                      </Text>
                      <Text style={styles.product}>{item.product}</Text>
                    </View>,
                    item?.qty,
                    item.price.toFixed(2),
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        textAlign: 'right',
                        marginRight: wp(2),
                      }}>
                      {item.amount.toFixed(2)}
                    </Text>,
                  ],
                ]}
                flexArr={[2, 1, 1]}
                style={{
                  borderBottomWidth: tableRows.length - 1 === i ? 0 : wp(0.1),
                }}
                textStyle={{
                  fontFamily: 'Montserrat-Bold',
                }}
              />
            ))}

            <TableWrapper
              style={{
                backgroundColor: colors.secondary,
                // width:wp(50),
                padding: wp(2),
                borderRadius: wp(2),
              }}>
              <Row
                data={['Subtotal : ', totalPrice.toFixed(2)]}
                style={{
                  paddingBottom: wp(1),
                }}
                textStyle={{
                  textAlign: 'right',
                  fontFamily: 'Montserrat-Medium',
                }}
                flexArr={[3, 1]}
              />
              <Row
                data={[<View />]} // Empty row
                style={{
                  borderBottomWidth: wp(0.1),
                  borderColor: colors.dark,
                  width: wp(40),
                  marginLeft: 'auto',
                }}
                textStyle={{
                  textAlign: 'right',
                }}
                flexArr={[1]}
              />
              <Row
                data={[
                  <View
                    style={{
                      position: 'relative',
                    }}>
                    <Text
                      style={{
                        // position: 'absolute',
                        zIndex: 9999,
                        fontSize: wp(3),
                        // top: -wp(2),
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      Discount
                    </Text>
                    <View style={[styles.totalPriceContainer]}>
                      <TextInput
                        keyboardType="number-pad"
                        maxLength={5}
                        multiline={false}
                        onChangeText={handleChange}
                        value={value}
                        editable={!shop ? true : false}
                        style={{
                          width: wp(17),
                          padding: wp(1),
                          paddingVertical: wp(0.2),
                          fontSize: wp(4),

                          fontFamily: 'Montserrat-Bold',
                          backgroundColor: colors.primary,
                          borderWidth: wp(0),
                          borderColor: colors.dark,
                          borderRadius: wp(1),
                          color: colors.dark,
                          marginRight: wp(2),
                          paddingLeft: wp(2),
                        }}
                      />
                      <Text style={styles.totalText}>%</Text>
                    </View>
                  </View>,

                  'Discount : ',
                  '-' + (value * (totalPrice / 100)).toFixed(2),
                ]}
                style={{
                  borderBottomWidth: wp(0),
                }}
                textStyle={{
                  textAlign: 'right',
                  fontFamily: 'Montserrat-Medium',
                }}
                flexArr={[2, 1, 1]}
              />
              <Row
                data={[<View />]} // Empty row
                style={{
                  borderBottomWidth: wp(0.1),
                  borderColor: colors.dark,
                  width: wp(40),
                  marginLeft: 'auto',
                  marginTop: wp(1),
                }}
                textStyle={{
                  textAlign: 'right',
                }}
                flexArr={[1]}
              />
              <Row
                data={[
                  'Total Amount : ',
                  (
                    totalPrice.toFixed(2) -
                    (value * (totalPrice / 100)).toFixed(2)
                  ).toFixed(2),
                ]}
                style={{}}
                textStyle={{
                  textAlign: 'right',
                  fontFamily: 'Montserrat-Bold',
                }}
                flexArr={[3, 1]}
              />
            </TableWrapper>
          </Table>
        </View>
        {!shop && (
          <SlideButton
            isCompleted={isCompleted}
            onCompleted={() => {
              setIsCompleted(true);
              handleSubmit();
            }}
          />
        )}
      </ScrollView>
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
  },
  billingContainer: {
    backgroundColor: colors.tertiary,
    padding: wp(2),
    borderRadius: wp(2),
    elevation: 10,
    marginVertical: wp(5),
  },
  tableTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.dark,
    borderBottomWidth: wp(0.1),
    padding: wp(2),
  },
  contentContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.dark,
    borderBottomWidth: wp(0.1),
    padding: wp(3),
  },
  productTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(3.5),
  },
  quantityTitle: {
    textAlign: 'right',
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(3.5),
  },
  priceTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(3.5),
  },
  product: {
    // maxWidth:'40%',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp(3),
  },
  quantity: {
    textAlign: 'right',

    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp(3.5),
  },
  price: {
    textAlign: 'right',

    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp(3.5),
  },
  tableTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:colors.textOrange,
    borderTopWidth: wp(0.5),
    padding: wp(2),
  },
  totalText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: wp(6),
    height: wp(6),
  },

  priceTag: {
    width: '100%',
    height: '100%',
  },
  priceTotal: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Bold',
  },
  lottieContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 150,
    width: wp(100),
    height: hp(120),
    bottom: 0,
    left: 0,
  },
});
