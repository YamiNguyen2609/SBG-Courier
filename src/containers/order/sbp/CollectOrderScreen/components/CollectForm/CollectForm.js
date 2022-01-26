import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {
  AppButton,
  AppText,
  Divider,
  IconBack,
} from '../../../../../../components';
import {Colors, Fonts, Metrics, Styles} from '../../../../../../themes';

export default class CollectForm extends Component {
  render() {
    const {visible, data} = this.props;
    return (
      <Modal
        isVisible={visible}
        style={styles.modal}
        animationInTiming={250}
        animationOutTiming={250}>
        <View
          style={[
            Styles.container,
            {backgroundColor: Colors.appLightGrayColor},
          ]}>
          <View style={styles.header}>
            <AppText
              text={'Danh sách gom'}
              size={Fonts.size.h5}
              color={Colors.appWhite}
            />
            <IconBack
              style={styles.logoBack}
              onPress={this.props.close}
              color={Colors.appWhite}
            />
          </View>
          <View style={styles.body}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={e => (
                <Item
                  {...e}
                  total={this.props.data.length}
                  removeHawb={this.props.removeHawb}
                  onCollect={this.props.onCollectOrder}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: Metrics.margin.regular}} />
              )}
            />
          </View>
        </View>
        <View style={styles.container_button}>
          <AppButton
            text={'Hủy'}
            size={Fonts.size.h5}
            border={0.8}
            borderColor={Colors.overlay2}
            width={'45%'}
            onPress={this.props.clearHawb}
          />
          <AppButton
            color={Colors.appWhite}
            text={'Xác nhận'}
            size={Fonts.size.h5}
            bgColor={Colors.appColor}
            width={'45%'}
            onPress={this.props.onCollect}
          />
        </View>
      </Modal>
    );
  }
}

class Item extends Component {
  state = {};
  render() {
    const {item, index, total} = this.props;

    const element = item;

    return (
      <View
        style={[
          styles.containerItem,
          !index ? {marginTop: Metrics.margin.regular} : null,
          index + 1 == total ? {marginBottom: Metrics.margin.regular} : null,
          element['total'] == element['current']
            ? {backgroundColor: '#C6FFC4'}
            : null,
        ]}>
        <View style={styles.headerItem}>
          <AppText
            text={
              element['orderNumber'] +
              ' (' +
              element['current'] +
              '/' +
              element['total'] +
              ')'
            }
            size={Fonts.size.h5}
          />
          {element['total'] == element['current'] ? (
            <TouchableOpacity onPress={() => this.props.onCollect([item])}>
              <IonIcon
                name="ios-checkmark-circle-outline"
                size={Fonts.size.h3}
                color={Colors.appGreen}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          <FlatList
            data={item['hawb']}
            renderItem={({item, index}) => (
              <View style={[styles.form]}>
                <AppText text={item} size={Fonts.size.h6} />
                <TouchableOpacity
                  onPress={() => this.props.removeHawb(element['id'], item)}
                  style={styles.close}
                  hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}>
                  <IonIcon
                    name="ios-close"
                    color={Colors.appRed}
                    size={Fonts.size.h1}
                  />
                </TouchableOpacity>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <Divider width={'100%'} height={0.8} />
            )}
          />
        </View>
      </View>
    );
  }
}
