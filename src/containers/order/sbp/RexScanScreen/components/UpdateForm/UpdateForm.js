import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity, FlatList} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {Styles, Colors, Fonts, Metrics} from '../../../../../../themes';
import {AppText, AppInput, Divider} from '../../../../../../components';

let packages = [];

export default class UpdateForm extends Component {
  state = {
    data: [0],
    height: 0,
  };

  getValue = () => {
    let res = packages.map(x => x._onSubmit());
    packages = [];
    return res.filter(
      x =>
        Number(x.width) > 0 &&
        Number(x.height) > 0 &&
        Number(x.long) > 0 &&
        Number(x.orderWeight) > 0,
    );
  };

  _onAddPackage = () => {
    let empty = packages.filter(function(x) {
      let data = x._onSubmit();
      const {orderWeight, weightCharge} = data;
      return !orderWeight && !weightCharge;
    });

    if (empty.length > 0) {
      return showMessage({
        message: 'Lỗi xác nhận',
        description: 'Trọng lượng và Trọng lượng tính cước không được để trống',
        type: 'warning',
      });
    }

    let length = this.state.data.length;

    let data = this.state.data.concat([length]);

    this.setState(
      {
        data,
      },
      () => {
        console.log(this.state.height);
        setTimeout(() => {
          this.list.scrollToEnd({
            animated: true,
          });
          console.log('done');
        }, 200);
      },
    );
  };

  updateHeightView = event => {
    let {x, y, width, height} = event.nativeEvent.layout;
    this.setState({height: y});
  };

  render() {
    return (
      <ScrollView
        ref={fl => (this.list = fl)}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          ItemSeparatorComponent={() => (
            <Divider height={Metrics.margin.large} color={'transparent'} />
          )}
          renderItem={({item, index}) => (
            <View
              onLayout={this.updateHeightView}
              style={[
                index == 0
                  ? {
                      marginTop: Metrics.margin.large,
                    }
                  : null,
              ]}>
              <Item
                ref={uf => (packages[index] = uf)}
                index={item}
                visible={this.state.visible}
                onSubmitData={this._onSubmitData}
                {...this.props}
              />
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addPackage}
          onPress={this._onAddPackage}>
          <AppText
            text={'Thêm kiện'}
            color={Colors.appWhite}
            size={Fonts.size.h6}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export class Item extends Component {
  state = {
    orderWeight: '',
    long: '',
    width: '',
    height: '',
    weightExchange: '',
    weightCharge: '',
  };

  roundByNum = number => {
    var decimalPart = number % 1;
    if (number < 21) {
      if (decimalPart === 0.5 || decimalPart === 0) {
        return number;
      } else if (decimalPart < 0.5) {
        return Math.round(number) + 0.5;
      } else {
        return Math.round(number);
      }
    } else {
      if (decimalPart === 0) {
        return number;
      } else if (decimalPart < 0.5) {
        return Math.round(number) + 1;
      } else {
        return Math.round(number);
      }
    }
  };

  updateWeight = () => {
    let {
      orderWeight,
      long,
      width,
      height,
      weightCharge,
      weightExchange,
    } = this.state;

    weightExchange = Number(weightExchange);

    if (long && width && height) {
      let dim = parseFloat(long) * parseFloat(width) * parseFloat(height);
      weightExchange = (dim / 6000).toFixed(2);
    }
    weightCharge = this.roundByNum(
      parseFloat(orderWeight) > parseFloat(weightExchange)
        ? orderWeight
        : weightExchange,
    );

    this.setState({weightExchange, weightCharge});
  };

  _onChangeText = (data, isUpdate) =>
    this.setState(data, isUpdate ? this.updateWeight : () => {});

  _onSubmit = () => {
    let dimType = 'cm';
    let weightType = 'kg';
    return {
      ...this.state,
      dimType,
      weightType,
    };
  };

  render() {
    const {index} = this.props;
    const {
      orderWeight,
      long,
      width,
      height,
      weightCharge,
      weightExchange,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <AppText
            text={'Kiện ' + index}
            size={Fonts.size.h6}
            color={Colors.appColor}
            bold
          />
          <TouchableOpacity>
            <IonIcon name={'ios-close'} size={Fonts.size.h6} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, marginBottom: Metrics.margin.regular}}>
          <View style={styles.title}>
            <AppText
              text={'Kích thước (cm)'}
              size={Fonts.size.h6}
              color={Colors.appColor}
              bold
            />
          </View>
          <View style={styles.containerInput}>
            <AppInput
              placeholder={'Dài'}
              style={styles.input}
              textAlign={'center'}
              keyboardType={'decimal-pad'}
              value={long}
              onChangeText={long => this._onChangeText({long}, true)}
            />
            <AppInput
              placeholder={'Rộng'}
              style={styles.input}
              textAlign={'center'}
              keyboardType={'decimal-pad'}
              value={width}
              onChangeText={width => this._onChangeText({width}, true)}
            />
            <AppInput
              placeholder={'Cao'}
              style={styles.input}
              textAlign={'center'}
              keyboardType={'decimal-pad'}
              value={height}
              onChangeText={height => this._onChangeText({height}, true)}
            />
          </View>
          <View style={styles.title}>
            <AppText
              text={'Trọng lượng (kg)'}
              size={Fonts.size.h6}
              color={Colors.appColor}
              bold
            />
          </View>
          <AppInput
            placeholder={'Trọng lượng'}
            style={styles.inputWeight}
            keyboardType={'decimal-pad'}
            value={orderWeight}
            onChangeText={orderWeight =>
              this._onChangeText({orderWeight}, true)
            }
          />
          <View style={styles.title}>
            <AppText
              text={'Trọng lượng quy đổi (kg)'}
              size={Fonts.size.h6}
              color={Colors.appColor}
              bold
            />
          </View>
          <View
            style={[
              styles.titleInput,
              {
                justifyContent: 'center',
                borderRadius: Metrics.borderRadius.small,
              },
            ]}>
            <AppText text={weightExchange} />
          </View>
          <View style={styles.title}>
            <AppText
              text={'Trọng lượng tính cước (kg)'}
              size={Fonts.size.h6}
              color={Colors.appColor}
              bold
            />
          </View>
          <AppInput
            placeholder={'Trọng lượng tính cước'}
            style={styles.inputWeight}
            keyboardType={'decimal-pad'}
            value={weightCharge}
            onChangeText={weightCharge => this._onChangeText({weightCharge})}
          />
        </View>
      </View>
    );
  }
}
