import React, {Component} from 'react';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {replaceScreen} from '../../../../redux/navigation';
import {
  getListDispatchOrder,
  onFirstLoad,
} from '../../../../redux/order/redux/getListDispatchOrder';
import {length, typeDispatch} from '../../../../helpers/Constants';
import {showFlagMessage, hideFlagMessage} from '../../../../redux/app';
import {showMessage} from 'react-native-flash-message';
import {scanOrderNumber} from '../../../../redux/order/redux/searchOrder';
import {getDetailOrder} from '../../../../redux/order/redux/getDetail';
import {getListDispatchOrderComplete} from '../../../../redux/order/redux/getListDispatchOrderComplete';
import {getListDispatchOrderDismiss} from '../../../../redux/order/redux/getListDispatchOrderDismiss';

export class ListOrderDispatchScreen extends Component {
  state = {
    isScan: true,
    isClose: false,
    pageNumberD: 1,
    pageNumberDDismiss: 1,
    pageNumberDComplete: 1,
    pageNumberR: 1,
    pageNumberRComplete: 1,
    classify: 0,
  };

  componentDidMount() {
    Orientation.lockToPortrait();
    // console.log('this.props.firstLoad', this.props.firstLoad);
    // if (!this.props.firstLoad) {
    // this.props.onFirstLoad();
    setTimeout(() => {
      this.props.getListDispatchOrder(typeDispatch.DELIVERY, 1, true, null);
      setTimeout(
        () =>
          this.props.getListDispatchOrder(typeDispatch.RECEIVE, 1, true, null),
        500,
      );
      this.props.getListDispatchOrderComplete(
        typeDispatch.DELIVERY,
        1,
        true,
        null,
      );
      setTimeout(
        () =>
          this.props.getListDispatchOrderComplete(
            typeDispatch.RECEIVE,
            1,
            true,
            null,
          ),
        500,
      );
      this.props.getListDispatchOrderDismiss(
        typeDispatch.DELIVERY,
        1,
        true,
        null,
      );
      setTimeout(
        () =>
          this.props.getListDispatchOrderDismiss(
            typeDispatch.RECEIVE,
            1,
            true,
            null,
          ),
        500,
      );
    }, 500);
    // }
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.flagItem !== nextProps.flagItem) {
      if (nextProps.itemSearch.item)
        this.props.replaceScreen('DetailOrderDispatchScreen', {
          item: nextProps.itemSearch.item,
          typeOrder: nextProps.itemSearch.type,
          screen: 'ListOrderDispatchScreen',
          classify: nextProps.itemSearch.classify,
        });
      else {
        showMessage({
          message: 'Lỗi tìm kiếm đơn hàng',
          description: 'Đơn hàng không tồn tại trong hệ thống',
          type: 'warning',
        });
      }
      setTimeout(() => {
        this.setState({isScan: true});
      }, 500);
    }

    if (this.props.flagDetail !== nextProps.flagDetail) {
      this.props.replaceScreen('DetailOrderDispatchScreen', {
        item: nextProps.itemDetail.data,
        typeOrder: nextProps.itemDetail.typeOrder,
        screen: 'ListOrderDispatchScreen',
        classify: this.state.classify,
      });
    }
  };

  _onBarCodeRead = (data, isPopup, type) => {
    if (this.state.isScan)
      this.setState({isScan: false}, () => {
        let code = data;

        this.props.scanOrderNumber({code, type});
      });
  };

  _onLoadMore = (refreshing, typeOrder, classify, keyword) => {
    if (classify == -1) {
      this.props.getListDispatchOrderDismiss(typeOrder, 1, true, keyword);
      this.props.getListDispatchOrder(typeOrder, 1, true, keyword);

      this.props.getListDispatchOrderComplete(typeOrder, 1, true, keyword);
    } else {
      if (!typeOrder) {
        switch (classify) {
          case 0:
            if (refreshing) {
              this.props.getListDispatchOrderDismiss(
                typeOrder,
                1,
                true,
                keyword,
              );
            } else {
              if (
                this.props.deliveriesDismiss.total >
                this.state.pageNumberDDismiss * length
              ) {
                this.setState(
                  {
                    pageNumberDDismiss: this.state.pageNumberDDismiss + 1,
                  },
                  () => {
                    this.props.getListDispatchOrderDismiss(
                      typeOrder,
                      this.state.pageNumberDDismiss,
                      false,
                      keyword,
                    );
                  },
                );
              }
            }
            break;

          case 1:
            if (refreshing) {
              this.props.getListDispatchOrder(typeOrder, 1, true, keyword);
            } else {
              if (
                this.props.deliveries.total >
                this.state.pageNumberD * length
              ) {
                this.setState(
                  {
                    pageNumberD: this.state.pageNumberD + 1,
                  },
                  () => {
                    this.props.getListDispatchOrder(
                      typeOrder,
                      this.state.pageNumberD,
                      false,
                      keyword,
                    );
                  },
                );
              }
            }
            break;

          case 2:
            if (refreshing) {
              this.props.getListDispatchOrderComplete(
                typeOrder,
                1,
                true,
                keyword,
              );
            } else {
              if (
                this.props.deliveriesComplete.total >
                this.state.pageNumberDComplete * length
              ) {
                this.setState(
                  {
                    pageNumberDComplete: this.state.pageNumberDComplete + 1,
                  },
                  () => {
                    this.props.getListDispatchOrderComplete(
                      typeOrder,
                      this.state.pageNumberDComplete,
                      false,
                      keyword,
                    );
                  },
                );
              }
            }
            break;

          default:
            break;
        }
      } else {
        switch (classify) {
          case 1:
            if (refreshing) {
              this.props.getListDispatchOrder(typeOrder, 1, true, keyword);
            } else {
              if (this.props.receives.total > this.state.pageNumberR * length) {
                this.setState(
                  {
                    pageNumberR: this.state.pageNumberR + 1,
                  },
                  () => {
                    this.props.getListDispatchOrder(
                      typeOrder,
                      this.state.pageNumberR,
                      false,
                      keyword,
                    );
                  },
                );
              }
            }
            break;

          case 2:
            if (refreshing) {
              this.props.getListDispatchOrderComplete(
                typeOrder,
                1,
                true,
                keyword,
              );
            } else {
              if (
                this.props.receivesComplete.total >=
                this.state.pageNumberRComplete * length
              ) {
                this.setState(
                  {
                    pageNumberRComplete: this.state.pageNumberRComplete + 1,
                  },
                  () => {
                    this.props.getListDispatchOrderComplete(
                      typeOrder,
                      this.state.pageNumberDComplete,
                      false,
                      keyword,
                    );
                  },
                );
              }
            }
            break;

          default:
            break;
        }
      }
    }
  };

  _onPressDetail = (item, typeOrder, classify) => {
    console.log(item, typeOrder, classify);
    this.setState({classify}, () =>
      this.props.getDetailOrder(typeOrder, item, classify),
    );
  };

  render() {
    const {route} = this.props;

    const {isTab} = route.params;

    return (
      <Render
        back={this.props.navigation.goBack}
        {...this.props}
        isTab={isTab}
        onLoadMore={this._onLoadMore}
        onPressDetail={this._onPressDetail}
        onBarCodeRead={this._onBarCodeRead}
      />
    );
  }
}

const mapStateToProps = state => ({
  deliveries: state.getListDispatchOrder.deliveries,
  deliveriesDismiss: state.getListDispatchOrderDismiss.deliveries,
  deliveriesComplete: state.getListDispatchOrderComplete.deliveries,
  // deliveriesReturn: {
  //   total: 0,
  //   data: [],
  // },
  receives: state.getListDispatchOrder.receives,
  receivesComplete: state.getListDispatchOrderComplete.receives,
  receivesDismiss: state.getListDispatchOrderDismiss.receives,
  routeFocus: state.app.routeFocus,
  firstLoad: state.getListDispatchOrder.firstLoad,
  itemSearch: state.searchOrder,
  flagItem: state.searchOrder.flag,
  flagDetail: state.getDetailOrder.flag,
  itemDetail: state.getDetailOrder,
});

const mapDispatchToProps = {
  replaceScreen,
  getListDispatchOrder,
  showFlagMessage,
  hideFlagMessage,
  onFirstLoad,
  scanOrderNumber,
  getDetailOrder,
  getListDispatchOrderComplete,
  getListDispatchOrderDismiss,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListOrderDispatchScreen);
