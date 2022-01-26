import React, {Component} from 'react';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation-locker';

import Render from './components/Render';
import {replaceScreen} from '../../../../redux/navigation';
import {getOrders, targetTab} from '../../../../redux/order/redux/getListOrder';
import {getListBillId} from '../../../../redux/order/redux/getListBillId';
import {length} from '../../../../helpers/Constants';

export class ListOrderScreen extends Component {
  state = {
    pageNumber: 1,
    total: 10,
    refreshing: false,
  };

  componentDidMount() {
    this.setState({pageNumber: 1}, () => {
      Orientation.lockToPortrait();
      if (!this.props.isTabDelivery) {
        this.props.targetTab();
        this.props.getOrders(1, true);
      }
    });
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.refreshFlag !== this.props.refreshFlag) {
      this.setState({pageNumber: 1}, () =>
        this.props.getOrders(this.state.pageNumber, true),
      );
    }
  };

  _onPressCamera = (code, data) => {
    this.props.replaceScreen('ScanOrderScreen', {
      company: 'sbs',
      code: code,
      images: data.map((e, idx) => {
        return {
          ...e,
          id: idx + 1,
          isUpload: true,
          isCheck: false,
        };
      }),
    });
  };

  _onPressDetail = (code, index, data) => {
    this.props.replaceScreen('DetailOrderScreen', {
      code,
      index,
      images: data,
    });
  };

  _onLoadMore = refreshing => {
    if (refreshing) {
      this.setState({pageNumber: 1}, () =>
        this.props.getOrders(this.state.pageNumber, true),
      );
    } else {
      if (this.state.pageNumber * length <= this.props.total)
        this.setState(
          {pageNumber: this.state.pageNumber + 1},
          () => this.props.getOrders(this.state.pageNumber, false),
          getOr,
        );
    }
  };
  render() {
    const {data, carState, connection, total} = this.props;
    const {refreshing} = this.state;

    const {params} = this.props.route;

    return (
      <Render
        data={data}
        total={total}
        carState={carState}
        refreshing={refreshing}
        connection={connection}
        tab={params ? params.isTab : false}
        onPressDetail={this._onPressDetail}
        back={this.props.navigation.goBack}
        onLoadMore={this._onLoadMore}
        onPressCamera={this._onPressCamera}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.getListOrder.orders,
  carState: state.carHandle.stateCar,
  refreshFlag: state.getListOrder.refreshing,
  isTabDelivery: state.getListOrder.isTabDelivery,
  total: state.getListOrder.total,
  connection: state.app.connection,
});

const mapDispatchToProps = {
  replaceScreen,
  getOrders,
  targetTab,
  getListBillId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListOrderScreen);
