import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import HeaderForm from '../HeaderForm';
import {Styles} from '../../../../../../themes';
import ListForm from '../ListForm';

export default class Render extends Component {
  state = {};
  render() {
    return (
      <View style={Styles.container}>
        <HeaderForm back={this.props.back} />
        <ListForm
          total={this.props.total}
          data={this.props.data}
          refreshing={false}
          onRefresh={() => this.props.onLoadMore(true)}
          showsVerticalScrollIndicator={false}
          onEndReached={() => this.props.onLoadMore(false)}
          onEndReachedThreshold={0.2}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
