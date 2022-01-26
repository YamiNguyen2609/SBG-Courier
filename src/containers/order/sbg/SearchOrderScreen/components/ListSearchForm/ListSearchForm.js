import React, {Component} from 'react';
import {View, FlatList, ScrollView, RefreshControl} from 'react-native';

import styles from './styles';
import {Divider, AppEmpty, AppButton} from '../../../../../../components';
import {Fonts, Colors, Images} from '../../../../../../themes';

export default class ListSearchForm extends Component {
  _renderItem = ({item, index}) => {
    const {bill_id} = item;
    return (
      <AppButton
        activeOpacity={1}
        style={styles.item}
        onPress={() => this.props.onPressSearch(bill_id)}
        text={'Bill ' + bill_id}
        align={'left'}
        size={Fonts.size.large}
      />
    );
  };

  render() {
    const {data} = this.props;
    return data.length > 0 ? (
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        data={data}
        renderItem={this._renderItem}
        ItemSeparatorComponent={() => {
          return <Divider height={0.8} color={Colors.overlay2} />;
        }}
      />
    ) : (
      <ScrollView
        style={styles.empty_container}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this.props.onRefresh} />
        }>
        <AppEmpty icon={Images.icOrder} title={'Chưa có hàng nào được scan'} />
      </ScrollView>
    );
  }
}
