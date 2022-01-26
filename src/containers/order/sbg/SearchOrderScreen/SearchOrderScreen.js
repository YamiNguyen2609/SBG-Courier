import React, {Component} from 'react';
import {connect} from 'react-redux';
import r from 'reactotron-react-native';
import Orientation from 'react-native-orientation-locker';

import Render from './components/Render';
import {getListBillId} from '../../../../redux/order/redux/getListBillId';
import {getImage} from '../../../../redux/order/redux/getImage';
import {searchBillId, onClear} from '../../../../redux/order/redux/searchBill';
import {replaceScreen} from '../../../../redux/navigation';

export class SearchOrderScreen extends Component {
  state = {
    data: [],
    isVisibleDetail: false,
    dataFilter: {
      code: '',
      images: [],
    },
    index: 0,
    billTarget: '',
  };

  componentWillMount() {
    this.props.getListBillId();
    Orientation.lockToPortrait();
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.bill && nextProps.bill != this.props.bill) {
      const {code, images} = nextProps.bill;
      this.props.getImage(images);
    }
    if (this.props.images !== nextProps.images && nextProps.images) {
      this.props.replaceScreen('DetailOrderScreen', {
        code: this.state.billTarget,
        index: 0,
        images: nextProps.images,
      });
    }
    if (this.props.billIds !== nextProps.billIds) {
      this.setState({data: nextProps.billIds});
    }
  };

  _onTextChange = keyword => {
    if (keyword) {
      const regex = new RegExp(keyword.toLowerCase());
      var data = this.props.billIds.filter(e => {
        return regex.test(e.bill_id.toLowerCase());
      });
    } else {
      data = this.props.billIds;
    }
    this.setState({data});
  };

  _onPressSearch = billId => {
    this.setState({billTarget: billId}, () => this.props.searchBillId(billId));
  };

  render() {
    const {data} = this.state;
    return (
      <Render
        back={this.props.navigation.goBack}
        data={data}
        onPressSearch={this._onPressSearch}
        onTextChange={this._onTextChange}
        onRefresh={this.props.getListBillId}
      />
    );
  }
}

const mapStateToProps = state => ({
  connection: state.app.state,
  billIds: state.getListBillId.billIds,
  bill: state.searchBill.bill,
  images: state.getImage.images,
});

const mapDispatchToProps = {
  getListBillId,
  getImage,
  searchBillId,
  onClear,
  replaceScreen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchOrderScreen);
