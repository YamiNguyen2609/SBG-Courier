import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {MaterialIndicator} from 'react-native-indicators';
import r from 'reactotron-react-native';

import styles from './styles';
import {AppText, AppButton, Divider} from '../../../../../../components';
import {Colors, Fonts, Metrics, Styles} from '../../../../../../themes';

export default class ListScanForm extends Component {
  state = {
    data: [],
    isShowIndicator: false,
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    r.log('next', nextProps);
    if (nextProps.isVisible) {
      this.setState({
        data: nextProps.data,
      });
      if (nextProps.itemRes)
        this.setState({isShowIndicator: !nextProps.isComplete});
    }
  };

  onPressSelected = index => {
    this.state.data[index].selected = !this.state.data[index].selected;

    this.setState({data: this.state.data});
  };

  onDelete = () => {
    this.setState(
      {
        data: this.state.data.filter(x => x.selected == false),
      },
      () => this.props.onDelete(this.state.data),
    );
  };

  onConfirm = () =>
    this.setState({isShowIndicator: true}, () =>
      this.props.dispatch(this.state.data),
    );

  render() {
    const {isVisible, data} = this.props;

    return (
      <Modal visible={isVisible} style={Styles.modal}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.icon, {backgroundColor: Colors.appRed}]}
              onPress={this.onDelete}>
              <IonIcon name={'ios-trash'} size={30} color={Colors.appWhite} />
            </TouchableOpacity>
            <AppText
              style={{flex: 1}}
              text={'Danh sách đơn hàng scan'}
              size={Fonts.size.h6}
              align={'center'}
              color={Colors.appWhite}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={styles.icon}
              onPress={this.props.close}>
              <IonIcon name={'ios-close'} size={32} color={Colors.appWhite} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.data}
            renderItem={item => (
              <Item {...item} onPress={this.onPressSelected} />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Divider height={0.8} />}
          />
          <View
            style={{
              ...Styles.center,
              paddingVertical: Metrics.margin.regular,
              borderTopColor: Colors.appLightGrayColor,
              borderTopWidth: 0.8,
            }}>
            <AppButton
              onPress={this.onConfirm}
              text={'Xác nhận'}
              bgColor={Colors.appColor}
              size={Fonts.size.h6}
              color={Colors.appWhite}
              width={150}
            />
          </View>
        </View>
        {this.state.isShowIndicator ? (
          <View style={styles.indicator}>
            <MaterialIndicator color={Colors.appColor} />
          </View>
        ) : null}
      </Modal>
    );
  }
}

class Item extends Component {
  render() {
    const {item, index} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(index)}
        style={[
          styles.item,
          {backgroundColor: item['selected'] ? Colors.overlay1 : null},
        ]}
        activeOpacity={1}
        key={index}>
        <AppText text={item['bill']} size={Fonts.size.large} />
        {item['message'] ? (
          <AppText text={item['message']} color={Colors.appRed} />
        ) : null}
      </TouchableOpacity>
    );
  }
}
