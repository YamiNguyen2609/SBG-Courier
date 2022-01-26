import React, {Component} from 'react';
import {connect} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {getListHistory} from '../../../../redux/order/redux/getListCollectHistory';
import {length} from '../../../../helpers/Constants';

export class HistoryCollectScreen extends Component {
  state = {data: [], page: 1, isRefresh: false};

  componentDidMount() {
    this.props.getListHistory(1, true);
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    // if (this.props.flag !== nextProps.flag)
    //   this.setState({data: nextProps.data});
  };

  _onLoadMore = refreshing => {
    if (refreshing) {
      this.setState({page: 1, isRefresh: true}, () => {
        this.props.getListHistory(this.state.page, true);
        this.setState({isRefresh: false});
      });
    } else {
      if (this.state.page * length < this.props.total)
        this.setState({page: this.state.page + 1}, () =>
          this.props.getListHistory(this.state.page, false),
        );
    }
  };

  render() {
    const {navigation, data} = this.props;

    return (
      <Render
        back={navigation.goBack}
        data={data}
        onLoadMore={this._onLoadMore}
      />
    );
  }
}

const mapStateToProps = state => ({
  total: state.getHistoryCollect.total,
  data: state.getHistoryCollect.data,
  flag: state.getHistoryCollect.refreshFlag,
});

const mapDispatchToProps = {
  getListHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryCollectScreen);
