import React, {Component} from 'react';
import {FlatList, View} from 'react-native';

import styles from './styles';
import {AppButton, AppText} from '../../../../../../components';
import {Colors, Fonts, Metrics} from '../../../../../../themes';
import {formatPrice} from '../../../../../../helpers/Utils';

class Item extends Component {
  state = {};
  render() {
    const {index, item, total} = this.props;

    return item['order'] ? (
      <View
        style={[
          styles.container,
          !index ? {marginTop: Metrics.margin.huge} : null,
          index + 1 == total ? {marginBottom: Metrics.margin.huge} : null,
        ]}>
        <View style={styles.header}>
          <AppText
            text={item['order']['orderNumber']}
            size={Fonts.size.h5}
            color={Colors.appColor}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.form}>
            <AppText text={'Trạng thái'} size={Fonts.size.large} />
            <AppText
              text={item['order']['statusName']['vi']}
              size={Fonts.size.large}
            />
          </View>
          <View style={styles.form}>
            <AppText text={'Tiền thu'} size={Fonts.size.large} />
            <AppText
              text={
                formatPrice(item['codCourierDebt'].replace('.000', '')) +
                ' ' +
                item['unitFee']
              }
              size={Fonts.size.large}
            />
          </View>
          <View style={styles.form}>
            <AppText text={'Nộp kế toán'} size={Fonts.size.large} />
            <AppText
              text={
                formatPrice(item['codCourierPaid'].replace('.000', '')) +
                ' ' +
                item['unitFee']
              }
              size={Fonts.size.large}
            />
          </View>
        </View>
      </View>
    ) : null;
  }
}

export default class ListForm extends Component {
  state = {};
  render() {
    return (
      <FlatList
        style={{flex: 1}}
        {...this.props}
        ItemSeparatorComponent={() => (
          <View style={{height: Metrics.margin.huge}} />
        )}
        showsVerticalScrollIndicator={false}
        renderItem={e => <Item {...e} total={this.props.total} />}
      />
    );
  }
}
