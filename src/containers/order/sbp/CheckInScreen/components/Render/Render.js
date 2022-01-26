import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import CameraForm from '../../../../../components/CameraForm';
import styles from './styles';
import {IconBack, AppText} from '../../../../../../components';
import {Styles, Metrics, Colors, Fonts} from '../../../../../../themes';
import ListForm from '../ListForm';

export default class Render extends Component {
  state = {
    visible: false,
    flag: 0,
    flagScan: 0,
    isScan: true,
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.flagScan != this.state.flagScan)
      this.setState({isScan: true});
    if (nextProps.flag != this.state.flag) {
      this.setState({visible: true, flag: nextProps.flag});
    }
  };

  _onFinishScan = data =>
    this.setState({visible: false}, () => this.props.onFinishScan(data));

  render() {
    return (
      <View style={styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <View style={styles.header}>
          <AppText
            text={'Checkin HAWB'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        <TouchableOpacity onPress={this.props.getListScan} style={styles.menu}>
          <IonIcon name={'ios-menu'} size={26} color={Colors.appWhite} />
        </TouchableOpacity>
        <CameraForm
          isScan={true}
          isInput={true}
          onSearchBill={this.props.onScan}
          onBarCodeRead={e => {
            if (
              e.type !== 'QR_CODE' &&
              !this.state.visible &&
              this.state.isScan
            ) {
              this.setState({isScan: false}, () =>
                this.props.onScan(String(e.data)),
              );
            }
          }}
        />
        <ListForm
          close={() => this.setState({visible: false})}
          visible={this.state.visible}
          data={this.props.data}
          onFinishScan={this._onFinishScan}
        />
      </View>
    );
  }
}
