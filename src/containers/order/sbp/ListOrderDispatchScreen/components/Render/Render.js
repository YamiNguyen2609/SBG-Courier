import React, {Component} from 'react';
import {View, Animated, Keyboard} from 'react-native';
import Swiper from 'react-native-swiper';

import styles from './styles';
import ListOrderForm from '../ListOrderForm';
import TabForm from '../TabForm';
import {IconBack, AppText} from '../../../../../../components';
import {Colors, Metrics, Fonts} from '../../../../../../themes';
import {typeDispatch} from '../../../../../../helpers/Constants';

export default class Render extends Component {
  state = {index: 0};

  _onLoadMore = (status, classify, keyword) =>
    //console.log(status, classify, keyword);
    this.props.onLoadMore(status, this.state.index, classify, keyword);

  render() {
    const {
      deliveries,
      receives,
      routeFocus,
      route,
      receivesComplete,
      receivesDismiss,
      deliveriesComplete,
      deliveriesDismiss,
      isTab,
      deliveriesReturn,
    } = this.props;

    const {index} = this.state;

    return (
      <View
        style={[
          styles.container,
          !isTab
            ? {
                paddingTop: Metrics.statusBarHeight,
              }
            : null,
        ]}>
        {isTab ? (
          <View>
            <IconBack
              style={styles.logoBack}
              onPress={this.props.back}
              color={Colors.appWhite}
            />
            <View style={styles.header}>
              <AppText
                text={'PUP/POD'}
                size={Fonts.size.h5}
                color={Colors.appWhite}
              />
            </View>
          </View>
        ) : null}
        <Swiper
          loop={false}
          ref={swiper => (this.swiper = swiper)}
          showsPagination={false}
          active={this.state.index}
          onIndexChanged={index => {
            if (index !== this.state.index) {
              Keyboard.dismiss();
              this.setState({index});
            }
          }}>
          <ListOrderForm
            typeOrder={typeDispatch.DELIVERY}
            index={index}
            routeFocus={routeFocus}
            items={deliveries.data}
            itemsDismiss={deliveriesDismiss.data}
            itemsComplete={deliveriesComplete.data}
            loadMore={this._onLoadMore}
            pressDetail={this.props.onPressDetail}
            onBarCodeRead={this.props.onBarCodeRead}
            ref={delivery => (this.delivery = delivery)}
            total={deliveries.total}
            totalDismiss={deliveriesDismiss.total}
            isTab={isTab}
            totalComplete={deliveriesComplete.total}
            showCamera={true}
            // itemsReturn={deliveriesReturn.data}
            // totalReturn={deliveriesReturn.total}
            onBarCodeRead={e => {
              if (e.type !== 'QR_CODE') {
                this.props.onBarCodeRead(String(e.data), 0, 0);
              }
            }}
          />
          <ListOrderForm
            typeOrder={typeDispatch.RECEIVE}
            items={receives.data}
            total={receives.total}
            totalComplete={receivesComplete.total}
            itemsComplete={receivesComplete.data}
            itemsDismiss={receivesDismiss.data}
            totalDismiss={receivesDismiss.total}
            pressDetail={this.props.onPressDetail}
            loadMore={this._onLoadMore}
            isTab={isTab}
            ref={receive => (this.receive = receive)}
            onBarCodeRead={e => {
              if (e.type !== 'QR_CODE') {
                this.props.onBarCodeRead(String(e.data), 0, 1);
              }
            }}
          />
        </Swiper>
        <TabForm
          index={index}
          totalDelivery={deliveries.total}
          totalReceiver={receives.total}
          onChangeIndex={index => {
            Keyboard.dismiss();
            this.swiper.scrollTo(index);
            this.setState({index});
          }}
        />
      </View>
    );
  }
}
