import React, {Component} from 'react';
import {
  View,
  Animated,
  UIManager,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {AppInput} from '../../../../../../components';
import {Fonts, Colors, Metrics, Styles, Images} from '../../../../../../themes';
import CameraForm from '../CameraForm';
import GroupForm from '../GroupForm';
import Item from '../Item';

export default class ListOrderForm extends Component {
  state = {
    timerCamera: new Animated.Value(0),
    isCamera: false,
    value: '',
    state: 1,
  };

  componentDidMount = () => {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  };

  _onSearch = value => {
    clearTimeout(this.timeout);

    this.setState({value}, () => {
      this.timeout = setTimeout(
        () => this.props.loadMore(true, this.state.state, this.state.value),
        400,
      );
    });
  };

  _onCamera = () => {
    this.setState({isCamera: !this.state.isCamera}, () =>
      Animated.timing(this.state.timerCamera, {
        toValue: this.state.isCamera ? 130 : 0,
        duration: 100,
        useNativeDriver: false,
      }).start(),
    );
  };

  _onPressState = currentState => {
    let state = -1;
    if (currentState != this.state.state) state = currentState;
    this.setState({state}, () =>
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut),
    );
  };

  render() {
    const {
      items,
      itemsComplete,
      itemsDismiss,
      total,
      totalComplete,
      totalDismiss,
      itemsReturn,
      totalReturn,
      typeOrder,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.container_search}>
          <AppInput
            value={this.state.value}
            placeholder={'Tìm kiếm theo mã đơn hàng'}
            bgColor={Colors.appWhite}
            style={{flex: 1}}
            size={Fonts.size.h6}
            onChangeText={val => this._onSearch(val)}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.camera}
              activeOpacity={0.8}
              onPress={this._onCamera}>
              <AntIcon name="camerao" color={Colors.appWhite} size={28} />
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={{
            height: this.state.timerCamera,
          }}>
          <CameraForm {...this.props} />
        </Animated.View>
        <GroupForm
          onPress={() => this._onPressState(1)}
          visible={this.state.state == 1}
          nameTitle={`${
            typeOrder ? 'Đang Nhận hàng' : 'Đang giao hàng'
          } (${total})`}
          colorTitle={Colors.appPrimaryColor}
          onRefresh={() =>
            this.props.loadMore(true, this.state.state, this.state.value)
          }
          onLoadMore={() =>
            this.props.loadMore(false, this.state.state, this.state.value)
          }
          data={items}
          renderItem={item => (
            <Item
              onPress={this.props.pressDetail}
              classify={1}
              {...item}
              total={total}
            />
          )}
        />
        <GroupForm
          onPress={() => this._onPressState(2)}
          visible={this.state.state == 2}
          nameTitle={`Hoàn Thành (${totalComplete})`}
          colorTitle={Colors.appGreen}
          onRefresh={() =>
            this.props.loadMore(true, this.state.state, this.state.value)
          }
          onLoadMore={() =>
            this.props.loadMore(false, this.state.state, this.state.value)
          }
          data={itemsComplete}
          renderItem={item => (
            <Item
              onPress={this.props.pressDetail}
              classify={2}
              {...item}
              total={totalComplete}
            />
          )}
        />
        {itemsDismiss ? (
          <GroupForm
            onPress={() => this._onPressState(0)}
            visible={this.state.state == 0}
            nameTitle={`Đã Hủy (${totalDismiss})`}
            colorTitle={Colors.appYellow}
            onRefresh={() =>
              this.props.loadMore(true, this.state.state, this.state.value)
            }
            onLoadMore={() =>
              this.props.loadMore(false, this.state.state, this.state.value)
            }
            data={itemsDismiss}
            renderItem={item => (
              <Item
                onPress={this.props.pressDetail}
                classify={0}
                {...item}
                total={total}
              />
            )}
          />
        ) : null}
      </View>
    );
  }
}
