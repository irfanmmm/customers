import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const test = () => {
  return (
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
                  data={brand}
                  labelField="label"
                  valueField="value"
                  search
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                    /*  [{"id": 1, "mrp": 35, "productCode": "DV", "productName": "DoveSoap1"}, {"id": 2, "mrp": 35, "productCode": "DV", "productName": "DoveSoap2"}, {"id": 3, "mrp": 35, "productCode": "DV", "productName": "DoveSoap3"}] */
                    let products = item.products.map(product => ({
                      label: product?.productName,
                      value: product?.id,
                      isChecked: false,
                      productDetails: product,
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
                <Text style={[styles.billingLabel]}>Products</Text>
                {/* <MultiSelect
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
                  multiple={true}
                  closeOnSelect={false}
                  open={isFocus}
                  setOpen={setIsFocus}
                  value={selectedValues}
                  onChange={(selectedValues) => {
                    // Filter selected products from the main products list
                    const selectedItems = products.filter(product =>
                      selectedValues.includes(product.value)
                    );
                    setSelectedValues(selectedItems); // Update state with selected items
                  }}

                  renderLeftIcon={() => (
                    <Image
                      style={styles.prefixIcon}
                      source={require('./../assets/images/package.png')}
                    />
                  )}
                  renderSelectedItem={(item, unSelect) => {
                    console.log(item, 'Selected Item Debug');
                    
                    return (
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
                    );
                  }}
                  renderItem={item => {
                    let isChecked = !!selectedValues.find(
                      value => value.value === item.value,
                    );

                    return (
                      <DropDownRenderItem
                        data={item}
                        checkBox
                        isChecked={isChecked}
                        onSelect={() => {
                          setSelectedValues(prev => {
                            const exists = prev.find(
                              value => value.value === item.value,
                            );
                            if (exists) {
                              return prev.filter(
                                value => value.value !== item.value,
                              );
                            }
                            return [...prev, {...item, isChecked: true}];
                          });
                        }}
                      />
                    );
                  }}
                /> */}
                <MultiSelect
                  search
                  data={products}
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
                  labelField="label"
                  valueField="value"
                  searchPlaceholder="Search..."
                  multiple={true}
                  closeOnSelect={false}
                  open={isFocus}
                  setOpen={setIsFocus}
                  value={selectedValues}
                  onChange={item => {
                    setSelectedValues(item);
                  }}
                  renderLeftIcon={() => (
                    <Image
                      style={styles.prefixIcon}
                      source={require('./../assets/images/package.png')}
                    />
                  )}
                  renderSelectedItem={(item, unSelect) => {
                    return (
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
  )
}

export default test

const styles = StyleSheet.create({})