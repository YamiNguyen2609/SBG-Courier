import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import ListHistoryForm from '../ListHistoryForm';
import {IconBack, AppText} from '../../../../../../components';
import {Colors, Fonts} from '../../../../../../themes';
import {isTablet} from '../../../../../../themes/iPhoneXHelper';

export default class Render extends Component {
  render() {
    const {data, refreshing} = this.props;

    return (
      <View style={styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <View style={isTablet() ? styles.headerTab : styles.header}>
          <AppText
            text={'Lịch sử gom hàng'}
            size={isTablet() ? Fonts.size.h3 : Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        <ListHistoryForm
          refreshing={false}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index}
          onRefresh={() => this.props.onLoadMore(true)}
          // onEndReached={() => this.props.onLoadMore(false)}
          // onEndReachedThreshold={0.2}
        />
      </View>
    );
  }
}
