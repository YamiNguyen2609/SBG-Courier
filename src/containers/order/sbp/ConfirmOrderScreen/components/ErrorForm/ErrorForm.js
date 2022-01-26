import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {
  AppInput,
  AppButton,
  AppText,
  Divider,
  IconBack,
} from '../../../../../../components';
import {Fonts, Colors, Metrics, Styles} from '../../../../../../themes';
import CameraForm from '../CameraForm';

export default class ErrorForm extends Component {
  state = {
    focus: false,
    index: 0,
    isCamera: false,
  };

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', () =>
      this.setState({focus: false}),
    );
  }

  _onPressInput = () => {
    if (this.state.focus) {
      this.setState({focus: false}, () => this.input.blur());
    } else {
      this.setState({focus: true}, () => this.input.focus());
    }
  };

  _getData = () => ({
    note: this.input.value(),
    ...this.listForm.state,
  });

  render() {
    const {data, images, isShowIndicator} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.header}>
            <AppText
              text="Lý do huỷ đơn hàng"
              size={Fonts.size.h5}
              bold
              color={Colors.appColor}
            />
          </View>
          <View style={styles.form}>
            <View style={{width: '100%'}}>
              {data.length > 0 ? (
                <Reasons
                  ref={listForm => (this.listForm = listForm)}
                  data={data}
                />
              ) : null}
            </View>
            <ScrollView style={styles.input}>
              <AppInput
                ref={input => (this.input = input)}
                bgColor={'transparent'}
                placeholder={'Ghi chú'}
                multiline={true}
                size={Fonts.size.h6}
              />
            </ScrollView>
          </View>
          <View style={styles.item}>
            <AppText
              text="Hình ảnh"
              bold
              color={Colors.appColor}
              size={Fonts.size.h5}
            />
            <TouchableOpacity onPress={() => this.setState({isCamera: true})}>
              <AppText
                text={'+ Thêm ảnh'}
                size={Fonts.size.h6}
                color={Colors.appColor}
              />
            </TouchableOpacity>
          </View>
          {images.length > 0 ? (
            <View
              style={[
                {
                  marginTop: -Metrics.margin.regular,
                  paddingHorizontal: Metrics.margin.regular,
                },
                styles.item,
              ]}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={images}
                horizontal={true}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      marginHorizontal: Metrics.margin.small,
                    }}
                  />
                )}
                renderItem={({item, index}) => (
                  <AppButton
                    onPress={() => this.props.onReadImage(index, images)}
                    style={styles.image}
                    renderItem={
                      <FastImage
                        source={{uri: item.base64}}
                        style={{
                          flex: 1,
                          borderRadius: Metrics.borderRadius.small,
                        }}
                      />
                    }
                  />
                )}
              />
            </View>
          ) : null}
        </View>
        <View style={styles.container_button}>
          <AppButton
            width={'40%'}
            text={'Xác nhận'}
            size={Fonts.size.h6}
            bgColor={Colors.appColor}
            color={Colors.appWhite}
            onPress={this.props.onPressConfirm}
          />
        </View>
        <Modal
          isVisible={this.state.isCamera}
          style={styles.modal}
          animationInTiming={250}
          animationIn="zoomInUp"
          animationOut="zoomOutUp"
          animationOutTiming={250}>
          <IconBack
            style={styles.logoBack}
            onPress={() => this.setState({isCamera: false})}
            color={Colors.appWhite}
          />
          <CameraForm {...this.props} />
          {isShowIndicator ? (
            <View style={styles.indicator}>
              <MaterialIndicator color={Colors.appColor} />
            </View>
          ) : null}
        </Modal>
      </View>
    );
  }
}

class Reasons extends Component {
  state = {
    isExpand: false,
    isExpandChild: false,
    data: [],
    reasonId: -1,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    if (this.props.data.length > 0) {
      this.setState({
        data: this.props.data.map(e => {
          return {
            ...e,
            target: false,
          };
        }),
      });
    }
  }

  _onPressChoose = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({isExpand: !this.state.isExpand});
  };

  _onPressChooseChild = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({isExpandChild: !this.state.isExpandChild});
  };

  _renderItem = ({item, index}) => {
    const {name, id, code} = item;
    return (
      <TouchableOpacity
        style={styles.item_reason}
        onPress={() =>
          this.setState({
            isExpand: false,
            reasonId: id,
          })
        }>
        <AppText
          text={code + ' - ' + name.vi}
          size={Fonts.size.h6}
          align={'left'}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {isExpand, data, reasonId} = this.state;

    let title =
      reasonId > 0
        ? data.filter(e => e.id == reasonId)[0]['name']['vi']
        : 'Chọn lý do hủy';

    return (
      <View>
        <View style={styles.container_reason}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AppButton
              onPress={this._onPressChoose}
              renderItem={
                <View
                  style={[
                    {flex: 1, flexDirection: 'row'},
                    Styles.center,
                    isExpand
                      ? {
                          borderBottomWidth: 0.8,
                          borderBottomColor: Colors.appLightGrayColor,
                        }
                      : null,
                  ]}>
                  <AppText
                    text={title}
                    align={'left'}
                    size={Fonts.size.h6}
                    style={{flex: 1}}
                  />
                  <IonIcon
                    name={isExpand ? 'ios-arrow-up' : 'ios-arrow-down'}
                    size={30}
                    color={Colors.overlay2}
                    style={{marginRight: Metrics.margin.regular}}
                  />
                </View>
              }
              style={{flex: 1}}
            />
          </View>
          <FlatList
            style={{
              height: isExpand
                ? data.length - 1 >= 5
                  ? 290
                  : (data.length - 1) * 58
                : 0,
            }}
            ItemSeparatorComponent={() => <Divider height={0.8} />}
            keyExtractor={(item, index) => item['id']}
            data={data}
            keyboardShouldPersistTaps={'handled'}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}
