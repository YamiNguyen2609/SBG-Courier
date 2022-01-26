import React, {Component} from 'react';
import {View, Keyboard} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {AppText, AppButton} from '../../../../../../components';
import {Colors, Fonts, Metrics} from '../../../../../../themes';

export default class FooterForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        {!this.props.isComplete ? (
          <View style={styles.box}>
            <AppButton
              // height={50}
              border={0.8}
              width={Metrics.screenWidth / 2 - Metrics.margin.regular * 2}
              borderColor={Colors.appRed}
              color={Colors.appRed}
              size={Fonts.size.h6}
              onPress={() => this.props.onPressConfirm(false)}
              //text={this.props.type ? 'Huỷ nhận hàng' : 'Huỷ giao hàng'}
              text={'Hủy'}
            />
            <AppButton
              style={styles.button_confirm}
              // height={50}
              border={0.8}
              width={Metrics.screenWidth / 2 - Metrics.margin.regular * 2}
              borderColor={Colors.appGreen}
              color={Colors.appGreen}
              size={Fonts.size.h6}
              onPress={() => this.props.onPressConfirm(true)}
              // text={
              //   this.props.type ? 'Xác nhận nhận hàng' : 'Xác nhận giao hàng'
              // }
              text={'Xác nhận'}
            />
          </View>
        ) : (
          <AppButton
            style={{marginVertical: Metrics.margin.regular}}
            // height={50}
            border={0.8}
            width={'80%'}
            onPress={this.props.onPressAddImage}
            borderColor={Colors.appColor}
            renderItem={
              <View style={styles.buttonAdd}>
                <IonIcon name="ios-camera" color={Colors.appColor} size={35} />
                <AppText
                  text="Thêm ảnh"
                  color={Colors.appColor}
                  size={Fonts.size.h5}
                />
              </View>
            }
          />
        )}
      </View>
    );
  }
}
