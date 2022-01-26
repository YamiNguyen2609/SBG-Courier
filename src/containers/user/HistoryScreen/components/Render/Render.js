import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';
import ListHistoryForm from '../ListHistoryForm';
import {IconBack, AppText} from '../../../../../components';
import {Colors, Fonts} from '../../../../../themes';

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
        <View style={styles.header}>
          <AppText
            text={'Lịch sử hoạt  động'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        <ListHistoryForm
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index}
          onRefresh={() => this.props.onLoadMore(true)}
          onEndReached={() => this.props.onLoadMore(false)}
          onEndReachedThreshold={0.2}
        />
      </View>
    );
  }
}
