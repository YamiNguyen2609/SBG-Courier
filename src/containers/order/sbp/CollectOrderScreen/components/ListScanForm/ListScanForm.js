import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';

import styles from './styles';
import {Fonts, Styles, Colors, Metrics} from '../../../../../../themes';
import {AppButton, AppText, IconBack} from '../../../../../../components';

export default class ListScanForm extends Component {
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
              text={'Danh sách HAWB checkin'}
              size={Fonts.size.h5}
              color={Colors.appWhite}
            />
            <IconBack
              style={styles.logoBack}
              onPress={this.props.onPressBack}
              color={Colors.appWhite}
            />
          </View>
          <View style={styles.body}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={e => <Item {...e} />}
              ItemSeparatorComponent={() => (
                <View style={{height: Metrics.margin.tiny}} />
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
            onPress={this.props.onCheckinFinish}
          />
        </View>
      </Modal>
    );
  }
}

class Item extends Component {
  state = {};
  render() {
    const {item} = this.props;

    return (
      <View style={styles.containerItem}>
        <AppText text={item.HAWB} size={Fonts.size.h5} />
        <AppText text={item.createdAt.split(' ')[1]} size={Fonts.size.h5} />
      </View>
    );
  }
}
