import React, {Component} from 'react';
import {connect} from 'react-redux';

import Render from './components/Render';
import {reportOrder} from '../../../../redux/order/redux/reportOrder';
import {length} from '../../../../helpers/Constants';

export class ReportScreen extends Component {
  state = {
    pageNumber: 1,
  };

  componentDidMount() {
    this.props.reportOrder(this.state.pageNumber, true);
  }

  _onLoadMore = refreshing => {
    if (!refreshing) {
      if (this.props.total > this.state.pageNumber * length) {
        this.setState({pageNumber: this.state.pageNumber + 1}, () =>
          this.props.getOrderTable(this.state.pageNumber, refreshing),
        );
      }
    } else
      this.setState({pageNumber: 1}, () =>
        this.props.getOrderTable(this.state.pageNumber, true),
      );
  };

  render() {
    return (
      <Render
        back={this.props.navigation.goBack}
        {...this.props}
        onLoadMore={this._onLoadMore}
      />
    );
  }
}

const mapStateToProp = state => ({
  data: state.reportOrder.data,
  total: state.reportOrder.total,
});

const mapDispatchToProp = {
  reportOrder,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(ReportScreen);
