import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import CameraForm from '../../../../../components/CameraForm';
import styles from './styles';
import {IconBack, AppText} from '../../../../../../components';
import {Styles, Metrics, Colors, Fonts} from '../../../../../../themes';

export default class Render extends Component {
  state = {
    flagScan: 0,
    isScan: true,
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.flagScan != this.state.flagScan)
      this.setState({isScan: true});
  };

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
            text={'Chuyển giao nhận'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
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
      </View>
    );
  }
}
