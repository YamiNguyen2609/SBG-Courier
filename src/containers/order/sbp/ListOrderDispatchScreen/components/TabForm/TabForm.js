import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {AppButton, AppText} from '../../../../../../components';
import {Fonts, Metrics, Colors, Styles} from '../../../../../../themes';
import {typeDispatch} from '../../../../../../helpers/Constants';

export default class TabForm extends Component {
  state = {};
  render() {
    const {index, totalDelivery, totalReceiver} = this.props;

    return (
      <View style={styles.container}>
        <AppButton
          height={65}
          borderRadius={0}
          style={{
            borderTopWidth: 5,
            borderTopColor:
              index == typeDispatch.DELIVERY ? Colors.appColor : null,
          }}
          onPress={() => this.props.onChangeIndex(typeDispatch.DELIVERY)}
          width={Metrics.screenWidth / 2}
          renderItem={
            <View style={[Styles.center, {flex: 1}]}>
              <AppText
                text={'Đi phát (' + totalDelivery + ')'}
                size={Fonts.size.h6 + 3}
                align={'center'}
                color={
                  index == typeDispatch.DELIVERY
                    ? Colors.appColor
                    : Colors.appTextBlack
                }
              />
            </View>
          }
        />
        <AppButton
          height={65}
          style={{
            borderTopWidth: 5,
            borderTopColor:
              index == typeDispatch.RECEIVE ? Colors.appColor : null,
          }}
          borderRadius={0}
          onPress={() => this.props.onChangeIndex(typeDispatch.RECEIVE)}
          width={Metrics.screenWidth / 2}
          renderItem={
            <View style={[Styles.center, {flex: 1}]}>
              <AppText
                text={'Đi nhận (' + totalReceiver + ')'}
                size={Fonts.size.h6 + 3}
                align={'center'}
                color={
                  index == typeDispatch.RECEIVE
                    ? Colors.appColor
                    : Colors.appTextBlack
                }
              />
            </View>
          }
        />
      </View>
    );
  }
}
