import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import Render from './components/Render';
import {changePassword} from '../../../redux/user/redux/changePassword';
import {getDetail} from '../../../redux/user/redux/getDetail';

export class UserScreen extends Component {
  componentDidMount() {
    this.props.getDetail();
    this.RenderView.changeStep(0);
  }

  onChangePassword = (oldPassword, password) => {
    Keyboard.dismiss();
    if (oldPassword && password)
      this.props.changePassword(oldPassword, password);
    else {
      showMessage({
        message: 'Lỗi',
        description: 'bạn chưa nhập dữ liệu',
        type: 'warning',
      });
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.refreshFlag !== nextProps.refreshFlag) {
      this.RenderView.changeStep(0);
    }
  };

  render() {
    const {data} = this.props;

    return (
      <Render
        ref={view => (this.RenderView = view)}
        data={data}
        onChangePassword={this.onChangePassword}
        back={this.props.navigation.goBack}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.getDetail.data,
  refreshFlag: state.changePassword.refreshFlag,
});

const mapDispatchToProps = {
  changePassword,
  getDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserScreen);
