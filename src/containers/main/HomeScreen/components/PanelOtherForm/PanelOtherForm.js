import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import r from 'reactotron-react-native';

import {Divider, AppText, IconBack} from '../../../../../components';
import {Metrics, Colors, Styles, Fonts} from '../../../../../themes';
import styles from './styles';
import ListMenu from '../ListMenu';
import {isTablet} from '../../../../../themes/iPhoneXHelper';

export default class PanelOtherForm extends Component {
  render() {
    const {data, visible, company} = this.props;
    return (
      <Modal
        isVisible={visible}
        style={styles.modal}
        animationInTiming={250}
        onBackdropPress={() => this.props.onPressMenu(8)}
        animationOutTiming={250}>
        <View
          style={[
            styles.container,
            {
              height: (Metrics.screenWidth / 2.3) * Math.ceil(data.length / 3),
            },
          ]}>
          <View
            style={[
              Styles.center,
              {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <View style={{width: 65}} />
            <AppText
              text={'Dịch vụ SBS'}
              bold
              style={styles.title}
              size={Fonts.size.h5}
            />
            <TouchableOpacity
              style={{width: 65}}
              onPress={() => this.props.onPressMenu(8)}>
              <AppText text={'Đóng'} size={Fonts.size.large} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 1}} />
            <View
              style={{
                height: 150 * Math.ceil(data.length / 3),
                // paddingHorizontal: Metrics.margin.large,
              }}>
              <ListMenu
                company={company}
                data={data}
                onPressMenu={this.props.onPressMenu}
              />
            </View>
            <View style={{flex: 1}} />
          </View>
        </View>
      </Modal>
    );
  }
}
