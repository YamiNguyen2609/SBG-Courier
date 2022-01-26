import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import SearchForm from '../SearchOrderForm';
import ListSearchForm from '../ListSearchForm';

export default class Render extends Component {
  render() {
    const {data} = this.props;

    return (
      <View style={styles.container}>
        <SearchForm
          back={this.props.back}
          onTextChange={this.props.onTextChange}
          onSearch={this.props.onSearch}
        />
        <ListSearchForm
          data={data}
          onRefresh={this.props.onRefresh}
          onPressSearch={this.props.onPressSearch}
        />
      </View>
    );
  }
}
