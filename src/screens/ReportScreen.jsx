import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/style';
import {wp} from '../styles/responsive';
import Header from '../components/Header';
import SlideButton from '../components/SlideButton/SlideButton';
const dummy = [
  {
    mame: 'Apple',
    qty: 15,
    price: 5000,
  },
  {
    mame: 'Apple',
    qty: 15,
    price: 5000,
  },
  {
    mame: 'Apple',
    qty: 15,
    price: 5000,
  },
  {
    mame: 'Apple',
    qty: 15,
    price: 5000,
  },
  {
    mame: 'Apple',
    qty: 15,
    price: 5000,
  },
  {
    mame: 'Apple',
    qty: 15,
    price: 5000,
  },
  {
    mame: 'Apple',
    qty: 15,
    price: 5000,
  },
  {
    mame: 'Apple',
    qty: 15,
    price: 5000,
  },
  {
    mame: 'Apple',
    qty: 15,
    price: 5000,
  },
];
const ReportScreen = () => {
  return (
    <LinearGradient colors={colors.gradient} style={styles.container}>
      <Header backButton title="Report" />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.billingContainer}>
          <View style={styles.tableTitleRow}>
            <View>
              <Text style={styles.productTitle}>Producte</Text>
            </View>
            <View>
              <Text style={styles.quantityTitle}>Quantity</Text>
            </View>
            <View>
              <Text style={styles.priceTitle}>Price</Text>
            </View>
          </View>
          {dummy.map((item, i) => (
            <View
              key={i}
              style={[
                styles.contentContainerRow,
                {borderBottomColor: i === dummy.length - 1 ? 0 : wp(0.1)},
              ]}>
              <View>
                <Text style={styles.product}>{item.mame}</Text>
              </View>
              <View>
                <Text style={styles.quantity}>{item.qty}</Text>
              </View>
              <View>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          ))}
          <View style={styles.tableTotalRow}>
            <View>
              <Text style={styles.totalText}>Total Price</Text>
            </View>
            <View>
              <Text style={styles.quantityTitle}></Text>
            </View>
            <View style={styles.totalPriceContainer}>
              <View style={styles.image}>
                <Image
                  style={styles.priceTag}
                  source={require('./../assets/images/rupee.png')}
                />
              </View>
              <Text style={styles.priceTotal}>1524</Text>
            </View>
          </View>
        </View>
        <SlideButton />
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
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(3.5),
  },
  priceTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(3.5),
  },
  product: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp(3.5),
  },
  quantity: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp(3.5),
  },
  price: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp(3.5),
  },
  tableTotalRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    // backgroundColor:colors.textOrange,
    borderTopWidth:wp(0.5),
    padding:wp(2)
  },
  totalText: {
    fontSize:wp(4),
    fontFamily:'Montserrat-Bold'
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
});
