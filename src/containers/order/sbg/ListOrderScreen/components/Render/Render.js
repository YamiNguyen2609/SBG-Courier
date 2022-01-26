import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import HeaderForm from '../HeaderForm';
import ListOrderForm from '../ListOrderForm';
import {IconBack} from '../../../../../../components';
import {Colors} from '../../../../../../themes';

export default class Render extends Component {
  state = {};
  render() {
    const {tab, data, carState, connection, total, isRefresh} = this.props;
    return (
      <View style={styles.container}>
        {tab ? (
          <IconBack
            style={styles.logoBack}
            onPress={this.props.back}
            color={Colors.appWhite}
          />
        ) : null}
        <HeaderForm total={total} />
        <ListOrderForm
          data={data}
          onLoadMore={this.props.onLoadMore}
          onPressDetail={this.props.onPressDetail}
          onPressCamera={this.props.onPressCamera}
        />
      </View>
    );
  }
}
