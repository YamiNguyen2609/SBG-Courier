import React, {Component} from 'react';
import {
  View,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {AppButton, AppText} from '../../../../../components';
import {Fonts, Colors, Metrics} from '../../../../../themes';

export default class ListIncidentForm extends Component {
  state = {
    isExpand: false,
    data: [],
    item: {},
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    if (this.props.data.length > 0) {
      this.setState({
        data: this.props.data,
        item: this.props.data.filter(e => e.target == true)[0],
      });
    }
  }

  _onPressChoose = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({isExpand: !this.state.isExpand});
  };

  _onPressItem = item => {
    this.setState({
      isExpand: false,
      item: item,
      data: this.state.data.map(e => {
        return {
          ...e,
          target: e.id == item.id ? true : false,
        };
      }),
    });
  };

  _renderItem = ({item, index}) => {
    const {name, target} = item;
    return !target ? (
      <AppButton
        text={name}
        size={Fonts.size.h6}
        align={'left'}
        style={styles.item}
        borderRadius={0}
        onPress={() => this._onPressItem(item)}
      />
    ) : null;
  };

  render() {
    const {isExpand, data} = this.state;

    let title =
      data.length > 0 ? data.filter(e => e.target == true)[0].name : '';
    return (
      <View style={styles.container}>
        <View>
          <AppButton
            onPress={this._onPressChoose}
            renderItem={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <AppText text={title} style={{flex: 1}} size={Fonts.size.h6} />
                <IonIcon
                  name={isExpand ? 'ios-arrow-up' : 'ios-arrow-down'}
                  size={30}
                  color={Colors.overlay2}
                  style={{marginRight: Metrics.margin.regular}}
                />
              </View>
            }
          />
        </View>
        <FlatList
          style={{
            height: isExpand
              ? data.length - 1 >= 5
                ? 290
                : data.length - 1 * 58
              : 0,
          }}
          keyExtractor={(item, index) => item['id']}
          data={data}
          keyboardShouldPersistTaps={'handled'}
          renderItem={this._renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
