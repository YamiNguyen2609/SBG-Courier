import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import styles from './styles';
import {AppText} from '../../../../../../components';
import {Fonts, Colors, Styles} from '../../../../../../themes';
import {statusOrder} from '../../../../../../helpers/Constants';

export default class HistoryForm extends Component {
  state = {};

  _renderItem = ({item, index}) => {
    return (
      <View
        style={[styles.item, {borderColor: statusOrder[item.statusId ?? 0]}]}>
        <AppText
          text={item.status_name ? item.status_name.vi : 'Đã thu tiền'}
          size={Fonts.size.h5}
          color={statusOrder[item.statusId ?? 0]}
        />
        {item.reasonDetail ? (
          <AppText text={item.reasonDetail.name.vi} size={Fonts.size.h6} />
        ) : null}
        {item.note ? (
          <AppText text={item.note} size={Fonts.size.large} />
        ) : null}
        <AppText
          text={
            'Ngày cập nhật ' +
            (item.updatedAt ?? moment().format('hh:mm:ss DD-MM-YYYY'))
          }
          italic
          color={Colors.overlay4}
        />
      </View>
    );
  };

  render() {
    return this.props.data.length > 0 ? (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem}
        />
      </View>
    ) : (
      <View style={[Styles.center, Styles.container, styles.container]}>
        <FontIcon name="history" size={180} color={Colors.appGrayColor} />
        <AppText
          style={styles.content}
          text={'Không có lịch sử giao hàng'}
          size={Fonts.size.h5}
          color={Colors.appGrayColor}
        />
      </View>
    );
  }
}
