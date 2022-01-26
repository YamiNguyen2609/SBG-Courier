import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {AppText} from '../../../../../../components';
import {Fonts, Colors, Metrics, Styles, Images} from '../../../../../../themes';

export default class GroupForm extends Component {
  render() {
    const {colorTitle, nameTitle, visible} = this.props;

    return (
      <View style={[styles.container, visible ? {flex: 1} : null]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[{backgroundColor: colorTitle}, styles.header]}
          onPress={this.props.onPress}>
          <AppText
            text={nameTitle}
            size={Fonts.size.h6}
            color={Colors.appWhite}
            bold
          />
          <AntIcon
            name={visible ? 'minus' : 'plus'}
            size={25}
            color={Colors.appWhite}
          />
        </TouchableOpacity>
        {visible ? (
          <FlatList
            {...this.props}
            refreshing={false}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: Metrics.margin.large,
                }}
              />
            )}
          />
        ) : null}
      </View>
    );
  }
}
