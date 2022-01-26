import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {IconBack, AppText} from '../../../../../../components';
import {Colors, Fonts} from '../../../../../../themes';
import CameraForm from '../../../../../components/CameraForm';
import CollectForm from '../CollectForm';

export default class Render extends Component {
  state = {
    visible: false,
    isScan: true,
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.flagScan != this.state.flagScan)
      this.setState({isScan: true});
  };

  _onCollect = () =>
    this.setState({visible: false}, () =>
      this.props.collectOrder(this.props.data),
    );

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
            text={'Gom đơn hàng'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.setState({visible: true})}
          style={styles.menu}>
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
        <CollectForm
          {...this.props}
          visible={this.state.visible}
          onCollect={this._onCollect}
          close={() => this.setState({visible: false})}
        />
      </View>
    );
  }
}
