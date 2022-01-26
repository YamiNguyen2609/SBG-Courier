import React, {Component} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import {Styles, Colors, Metrics, Fonts} from '../../../../../../themes';
import {
  AppText,
  IconBack,
  AppButton,
  Divider,
} from '../../../../../../components';
import CameraForm from '../../../../../components/CameraForm';
import UpdateForm from '../UpdateForm';

export default class Render extends Component {
  state = {
    visible: false,
    flag: 0,
    data: [0],
    height: 0,
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.state.flag != nextProps.data.flag) {
      this.setState({visible: false});
    }
  };

  _onSubmit = data =>
    this.setState({visible: false}, () =>
      this.props.onSubmit(this.UpdateForm.getValue()),
    );

  _onBarCodeRead = (data, isPopup) => {
    let code = data;

    if (code.startsWith('77') && code.endsWith('0430'))
      code = code.substr(0, code.length - 4);

    if (isPopup) {
      this.props.showFlagMessage({
        message: 'Đã tìm thấy bill ' + code,
        buttons: [
          {
            title: 'Quét lại',
            onPress: () => {
              this.props.hideFlagMessage();
            },
          },
          {
            title: 'Tiếp tục',
            onPress: () => {
              this.props.getSelling(code);
              this.props.hideFlagMessage();
            },
          },
        ],
      });
    } else {
      this.setState({barCode: code});
    }
  };

  _onBack = () => {
    this.setState({visible: false}, () => {
      this.props.clearSelling();
      this.props.back();
    });
  };

  render() {
    return (
      <View style={[Styles.container, styles.container]}>
        <IconBack
          style={styles.logoBack}
          onPress={this._onBack}
          color={Colors.appWhite}
        />
        <View style={styles.header}>
          <AppText
            text={'Cập nhật đơn hàng'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        {!this.props.data.data ? (
          <CameraForm
            isInput={true}
            isScan={true}
            onSearchBill={this._onBarCodeRead}
            onBarCodeRead={e => {
              if (!this.state.isUpdate) {
                const {width, height, origin} = e.bounds;

                let minX = (260 * width) / 1600;
                let maxX = (964 * width) / 1600;
                let minY = (800 * height) / 1200;
                let maxY = (900 * height) / 1200;

                if (
                  //origin[0].x >= minX &&
                  //origin[1].x <= maxX &&
                  origin[0].y >= minY &&
                  origin[1].y <= maxY
                ) {
                  if (e.type !== 'QR_CODE') {
                    this._onBarCodeRead(String(e.data), true);
                  }
                }
              }
            }}
          />
        ) : (
          <View style={{flex: 1}}>
            <View style={styles.titleInput}>
              <AppText text={this.props.data.data.orderNumber} />
            </View>
            <View style={{flex: 1}}>
              <UpdateForm ref={uf => (this.UpdateForm = uf)} />
            </View>
            <View style={styles.containerButton}>
              <AppButton
                border={0.8}
                width={Metrics.screenWidth / 2 - Metrics.margin.regular * 2}
                borderColor={Colors.appRed}
                color={Colors.appRed}
                size={Fonts.size.h6}
                onPress={this.props.clearSelling}
                text={'Hủy'}
              />
              <AppButton
                style={styles.button_confirm}
                border={0.8}
                width={Metrics.screenWidth / 2 - Metrics.margin.regular * 2}
                borderColor={Colors.appGreen}
                color={Colors.appGreen}
                size={Fonts.size.h6}
                onPress={this._onSubmit}
                text={'Xác nhận'}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}
