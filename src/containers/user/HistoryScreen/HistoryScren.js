import React, {Component} from 'react';
import {connect} from 'react-redux';
import r from 'reactotron-react-native';

import Render from './components/Render';
import {getListHistory} from '../../../redux/user/redux/getListHistory';

import {length} from '../../../helpers/Constants';

export class HistoryScreen extends Component {
  state = {data: [], page: 1, isRefresh: false};

  componentDidMount() {
    this.props.getListHistory(this.state.page, true);
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.flag !== nextProps.flag)
      this.setState({data: nextProps.data});
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
    const {isRefresh, data} = this.state;
    const {navigation} = this.props;

    r.log(data);

    return (
      <Render
        back={navigation.goBack}
        data={data}
        refreshing={isRefresh}
        onLoadMore={this._onLoadMore}
      />
    );
  }
}

const mapStateToProps = state => ({
  total: state.getListHistory.total,
  data: state.getListHistory.data,
  flag: state.getListHistory.refreshFlag,
});

const mapDispatchToProps = {
  getListHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryScreen);
