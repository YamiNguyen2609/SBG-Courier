import React, {Component} from 'react';
import {connect} from 'react-redux';

import Render from './components/Render';
import {getImage, onClear} from '../../../../redux/order/redux/getImage';

export class DetailOrderScreen extends Component {
  state = {};

  UNSAFE_componentWillMount() {
    const {images} = this.props.route.params;
    if (this.props.user.companyId == 'sbs') this.props.getImage(images);
  }

  back = () => {
    this.props.onClear();
    this.props.navigation.goBack();
  };

  render() {
    const {code, index, images} = this.props.route.params;
    const {data, user} = this.props;

    let dataImage = [];
    if (user.companyId == 'sbs') dataImage = data;
    else dataImage = images;

    return dataImage.length > 0 ? (
      <Render
        bill={code}
        idx={index}
        images={images}
        data={dataImage}
        back={this.back}
      />
    ) : null;
  }
}

const mapStateToProps = state => ({
  user: state.loginUser.user,
  data: state.getImage.images,
});

const mapDispatchToProps = {
  getImage,
  onClear,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailOrderScreen);
