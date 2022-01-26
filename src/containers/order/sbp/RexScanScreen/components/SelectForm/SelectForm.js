import React, {Component} from 'react';
import {View, FlatList, LayoutAnimation, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';
import {AppButton, AppText, Divider} from '../../../../../../components';
import {Colors, Fonts} from '../../../../../../themes';

export default class SelectForm extends Component {
  state = {
    value: '',
    isExpand: true,
    data: [],
  };

  componentDidMount() {
    this.setState({
      value: this.props.data[0],
      data: this.props.data.filter((item, index) => index > 0),
    });
  }

  _onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isExpand: !this.state.isExpand,
    });
  };

  _onSelected = value =>
    this.setState({
      isExpand: true,
      value,
      data: this.props.data.filter((item, index) => item != value),
    });

  value = () => {
    return this.state.value;
  };

  render() {
    const {data, title, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.header}
          onPress={this._onPress}>
          <AppText text={this.state.value} size={Fonts.size.large} />
        </TouchableOpacity>
        <Modal
          backdropOpacity={0}
          onBackdropPress={() => this.setState({isExpand: true})}
          isVisible={!this.state.isExpand}
          style={styles.modal}>
          <View
            style={{
              height: (data.length - 1) * (55 + 0.8),
              backgroundColor: Colors.appWhite,
            }}>
            <FlatList
              data={this.state.data}
              key={(item, index) => item}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <Divider height={0.8} />}
              renderItem={({item, index}) => (
                <AppButton
                  onPress={() => this._onSelected(item)}
                  text={item}
                  height={55}
                  width={'100%'}
                  size={Fonts.size.large}
                  align={'left'}
                />
              )}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
