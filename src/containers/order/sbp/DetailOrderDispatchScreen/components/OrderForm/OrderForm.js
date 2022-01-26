import React, {Component} from 'react';
import {
  Animated,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  View,
  FlatList,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FlashMessage, {showMessage} from 'react-native-flash-message';

import {AppButton, AppInput, AppText} from '../../../../../../components';
import {Colors, Fonts, Metrics, Styles} from '../../../../../../themes';
import styles from './styles';
import CameraForm from '../CameraForm';
import PackageForm from '../PackageForm';

export default class OrderForm extends Component {
  state = {
    timerCamera: new Animated.Value(0),
    isCamera: false,
    packages: [],
  };

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', () =>
      this.setState({isCamera: false}, () =>
        Animated.timing(this.state.timerCamera, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start(),
      ),
    );
  }

  _toggleCamera = () => {
    Keyboard.dismiss();
    this.setState({isCamera: !this.state.isCamera}, () => {
      if (this.state.isCamera) {
        Animated.timing(this.state.timerCamera, {
          toValue: 130,
          duration: 100,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(this.state.timerCamera, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }
    });
  };

  _onHandlePackage = status => {
    if (status) {
      let packages = this.state.packages;
      let isEmpty =
        packages.length > 0
          ? packages.filter(
              e =>
                e.weight == '' &&
                e.width == '' &&
                e.long == '' &&
                e.height == '',
            ).length > 0
          : false;

      if (isEmpty)
        this.flashMess.showMessage({
          message: 'Lỗi thêm kiện',
          description: 'Kích thước và cân năng không được để trống',
          type: 'warning',
        });
      else {
        packages.push({
          width: '',
          height: '',
          long: '',
          weight: '',
          isCreate: true,
        });
        this.setState({packages});
      }
    }
  };

  _onUpdateData = (data, index, status) => {
    if (status) {
      this.state.packages[index] = data;
    } else
      this.state.packages = this.state.packages.filter(
        (e, idx) => idx != index,
      );

    this.setState({packages: this.state.packages});
  };

  render() {
    const {visible} = this.props;
    const {packages} = this.state;
    return (
      <Modal isVisible={visible} style={Styles.modal}>
        <View style={styles.container}>
          <View style={styles.header}>
            <AppText
              text={'Thêm đơn hàng'}
              size={Fonts.size.h5}
              color={Colors.appWhite}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.title}>
              <AppText
                size={Fonts.size.h5}
                text={'Mã đơn hàng'}
                bold
                color={Colors.appColor}
              />
            </View>
            <View style={styles.containerSearch}>
              <View style={styles.containerInput}>
                <AppInput
                  placeholder={'Nhập mã đơn hàng, ex: GBxxxxxxxxxx'}
                  height={50}
                  size={Fonts.size.large}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={this._toggleCamera}
                  style={styles.cameraIcon}>
                  <IonIcon
                    name={'ios-camera'}
                    size={Fonts.size.h2}
                    color={Colors.appLightGrayColor}
                  />
                </TouchableOpacity>
              </View>
              <Animated.View
                style={{
                  height: this.state.timerCamera,
                }}>
                <CameraForm {...this.props} />
              </Animated.View>
            </View>
            <View
              style={[
                styles.title,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: Metrics.margin.large,
                },
              ]}>
              <AppText
                size={Fonts.size.h5}
                text={'kiện hàng'}
                bold
                color={Colors.appColor}
              />
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => this._onHandlePackage(true)}>
                <IonIcon
                  name={'ios-add'}
                  color={Colors.appWhite}
                  size={Fonts.size.h2}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              style={{
                paddingHorizontal: Metrics.margin.small,
                backgroundColor: 'red',
              }}
              data={packages}
              key={(item, index) => index}
              keyboardShouldPersistTaps={'handled'}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => (
                <Divider
                  height={Metrics.margin.regular}
                  color={'transparent'}
                />
              )}
              renderItem={({item, index}) => (
                <PackageForm
                  isComplete={this.props.isComplete}
                  item={item}
                  index={index}
                  style={styles.card}
                  length={packages.length}
                  onUpdateOrder={this._onUpdateData}
                />
              )}
            />
            <View
              style={[
                styles.title,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: Metrics.margin.large,
                },
              ]}>
              <AppText
                size={Fonts.size.h5}
                text={'Thanh toán'}
                bold
                color={Colors.appColor}
              />
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => this._onHandlePackage(true)}>
                <IonIcon
                  name={'ios-add'}
                  color={Colors.appWhite}
                  size={Fonts.size.h2}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <AppButton
              size={Fonts.size.h5}
              borderColor={Colors.appRed}
              border={0.8}
              text={'Hủy'}
              color={Colors.appRed}
              onPress={this.props.onClose}
              width={(Metrics.screenWidth - Metrics.margin.regular * 4) / 2}
            />
            <AppButton
              text={'Hoàn tất'}
              size={Fonts.size.h5}
              borderColor={Colors.appGreen}
              border={0.8}
              color={Colors.appGreen}
              width={(Metrics.screenWidth - Metrics.margin.regular * 4) / 2}
            />
          </View>
        </View>
        <FlashMessage
          ref={fm => (this.flashMess = fm)}
          position="top"
          style={{paddingTop: 20}}
        />
      </Modal>
    );
  }
}
