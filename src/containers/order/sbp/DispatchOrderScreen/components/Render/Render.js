import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import r from 'reactotron-react-native';

import styles from './styles';
import CameraForm from '../../../../../components/CameraForm';
import {Colors, Metrics, Styles} from '../../../../../../themes';
import {AppButton, AppText, IconBack} from '../../../../../../components';
import ListScanForm from '../ListScanForm';
import {showMessage} from 'react-native-flash-message';

export default class Render extends Component {
  state = {
    isFlash: false,
    isVisible: false,
    data: [],
    isScan: true,
  };

  _onAddBill = item => {
    this.setState({isScan: false}, () => {
      let bill = this.state.data.find(x => x.bill == item);
      if (!bill) {
        let data = this.state.data.concat([
          {
            bill: item,
            message: '',
            selected: false,
          },
        ]);
        this.setState({data}, () => {
          showMessage({
            type: 'success',
            message: 'Scan mã đơn hàng',
            description: item + ' scan thành công',
          });
        });
      } else {
        showMessage({
          type: 'warning',
          message: 'Lỗi scan mã đơn hàng',
          description: item + ' đã được scan',
        });
      }
      setTimeout(() => this.setState({isScan: true}), 2000);
    });
  };

  _onDelete = data => this.setState({data});

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.itemRes) {
      if (nextProps.success) {
        this.setState({
          data: this.state.data.filter(x => x.bill != nextProps.itemRes.bill),
        });
      } else {
        let index = this.state.data
          .map(x => x.bill)
          .indexOf(nextProps.itemRes.bill);
        console.log('inex', index, nextProps.itemRes, this.state.data);
        this.state.data[index].message = nextProps.itemRes.message;
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.setState({isVisible: true})}
          style={styles.logoCube}>
          <MaterialIcon name={'cube'} size={25} color={Colors.appWhite} />
          {this.state.data.length > 0 ? (
            <View
              style={[
                styles.textCount,
                {
                  width: 22 + this.state.data.length.toString().length * 5,
                },
              ]}>
              <Text
                style={{
                  fontSize: 10,
                  color: Colors.appWhite,
                  margin: Metrics.margin.small,
                }}>
                {this.state.data.length}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <CameraForm
          isInput={true}
          isScan={true}
          onBarCodeRead={e => {
            if (this.state.isScan) {
              const {width, height, origin} = e.bounds;

              let minX = (260 * width) / 1600;
              let maxX = (964 * width) / 1600;
              let minY = (800 * height) / 1200;
              let maxY = (800 * height) / 1200;

              r.log('origin', origin);

              if (
                //origin[0].x >= minX &&
                //origin[1].x <= maxX &&
                origin[0].y >= minY - 50 &&
                origin[1].y <= maxY + 50
              ) {
                if (e.type !== 'QR_CODE') {
                  this._onAddBill(String(e.data));
                }
              }
            }
          }}
          onSearchBill={this._onAddBill}
        />
        <ListScanForm
          isVisible={this.state.isVisible}
          data={this.state.data}
          close={() => this.setState({isVisible: false})}
          dispatch={this.props.dispatchOrder}
          onDelete={this._onDelete}
          {...this.props}
        />
      </View>
    );
  }
}
