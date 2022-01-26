import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import OctIcon from 'react-native-vector-icons/Octicons';

import styles from './styles';
import {AppEmpty, AppText} from '../../../../../../components';
import {Colors, Fonts, Metrics, Styles} from '../../../../../../themes';
import {formatPrice} from '../../../../../../helpers/Utils';

export default class DetailListProduct extends Component {
  state = {};
  render() {
    return this.props.data.length > 0 ? (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          data={this.props.data}
          renderItem={({item, index}) => {
            const {
              productName,
              amount,
              totalPrice,
              currency,
              totalAmount,
              unitAmount,
              qty,
            } = item;
            return (
              <View
                style={[
                  styles.card,
                  !index ? {marginTop: Metrics.margin.large} : null,
                ]}
                key={index}>
                <View style={styles.form}>
                  <AppText
                    size={Fonts.size.h6}
                    text="Sản phẩm:"
                    style={styles.title}
                  />
                  <AppText
                    size={Fonts.size.h6}
                    text={productName ?? 'Đang cập nhật'}
                    style={{flex: 1}}
                  />
                </View>
                <View style={styles.form}>
                  <AppText
                    size={Fonts.size.h6}
                    text="Số Lượng:"
                    style={styles.title}
                  />
                  <AppText
                    size={Fonts.size.h6}
                    text={
                      amount || qty
                        ? amount ?? qty + ' sản phẩm'
                        : 'Đang cập nhật'
                    }
                    style={{flex: 1}}
                  />
                </View>
                <View style={styles.form}>
                  <AppText
                    size={Fonts.size.h6}
                    text="Tổng tiền:"
                    style={styles.title}
                  />
                  <AppText
                    size={Fonts.size.h6}
                    text={
                      totalPrice
                        ? formatPrice(totalPrice) + ' ' + this.props.currency
                        : totalAmount
                        ? formatPrice(totalAmount) + ' ' + this.props.currency
                        : 'Đang cập nhật'
                    }
                    style={{flex: 1}}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    ) : (
      <View style={[Styles.center, Styles.container, styles.container]}>
        <OctIcon name="package" size={180} color={Colors.appGrayColor} />
        <AppText
          style={styles.content}
          text={'Không có danh sách sản phẩm'}
          size={Fonts.size.h5}
          color={Colors.appGrayColor}
        />
      </View>
    );
  }
}
