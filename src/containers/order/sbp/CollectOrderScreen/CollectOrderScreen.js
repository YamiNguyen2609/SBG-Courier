import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sound from 'react-native-sound';
import {showMessage} from 'react-native-flash-message';
import r from 'reactotron-react-native';

import Render from './components/Render';

import {collectOrder} from '../../../../redux/order/redux/collectOrder';
import {
  checkExistHawb,
  removeHawb,
  clearHawb,
  addHawb,
} from '../../../../redux/order/redux/checkExistHAWBs';
import {adminOrder} from '../../../../helpers/Constants';
import {replaceScreen} from '../../../../redux/navigation';
import {showFlagMessage, hideFlagMessage} from '../../../../redux/app';

export class CollectOrderScreen extends Component {
  state = {
    isScan: false,
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.flagItem != nextProps.flagItem) {
      let exist = nextProps.data.filter(
        e => nextProps.item.orderNumber == e.orderNumber,
      );
      if (exist.length == 0 && this.props.data.length > 0) {
        return this.props.showFlagMessage({
          message:
            nextProps.item.orderNumber +
            ' không nằm trong danh sách gom, bạn có muốn tiếp tục ?',
          buttons: [
            {
              title: 'Huỷ',
              onPress: () => {
                this.props.hideFlagMessage();
              },
            },
            {
              title: 'Tiếp tục',
              onPress: () => {
                this.props.hideFlagMessage();
                setTimeout(() => {
                  this.props.addHawb([nextProps.item]);
                }, 350);
              },
            },
          ],
        });
      } else {
        this.props.addHawb([nextProps.item]);
      }
    }

    if (this.props.status != nextProps.status) {
      switch (nextProps.status) {
        case 1:
          this._getSound('hold');

          showMessage({
            type: 'warning',
            message: 'Scan đơn hàng',
            description: 'Hawb đã được scan',
          });
          break;

        case 2:
          let sound = this.props.data.length == 1 ? 'don_moi' : 'ok';

          this._getSound(sound);
          showMessage({
            type: 'success',
            message: 'Scan đơn hàng',
            description: 'Scan hawb thành công',
          });

          break;

        case 3:
          this._getSound('gom_du');

          showMessage({
            type: 'success',
            message: 'Scan đơn hàng',
            description: 'Đơn hàng đã gom đủ',
          });
          break;
      }
    }

    setTimeout(() => {
      this.setState({isScan: false});
    }, 2 * 1000);
  };

  _getSound = name => {
    Sound.setCategory('Playback');
    var whoosh = new Sound(name, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      whoosh.play();
    });
  };

  _onScan = data => this.props.checkExistHawb(data);

  render() {
    const {data} = this.props;

    return (
      <Render
        back={this.props.navigation.goBack}
        {...this.props}
        onScan={this._onScan}
        onPressHistory={() => this.props.replaceScreen('HistoryCollectScreen')}
      />
    );
  }
}

const mapStateToProp = state => ({
  flagScan: state.checkExistHAWB.flag,
  error: state.checkExistHAWB.error,
  data: state.checkExistHAWB.data,
  item: state.checkExistHAWB.item,
  flagItem: state.checkExistHAWB.flagItem,
  status: state.checkExistHAWB.status,
});

const mapDispatchToProp = {
  collectOrder,
  checkExistHawb,
  replaceScreen,
  removeHawb,
  clearHawb,
  showFlagMessage,
  hideFlagMessage,
  addHawb,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(CollectOrderScreen);
