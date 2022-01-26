import React, {Component} from 'react';
import {
  View,
  Keyboard,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import {
  AppText,
  AppInput,
  AppButton,
  AppAlert,
  Divider,
} from '../../../../../../components';
import {Colors, Fonts, Metrics, Images, Styles} from '../../../../../../themes';
import {formatPrice} from '../../../../../../helpers/Utils';
import {payments} from '../../../../../../helpers/Constants';

let form = [];

export default class PaymentForm extends Component {
  state = {
    data: [],
    visible: false,
    payment: {},
  };

  componentDidMount() {
    if (this.props.isLoad) this._onNewForm();
  }

  _onRemoveForm = payment =>
    this.setState({
      data: this.state.data.filter(x => x.payment != payment),
    });

  _onNewForm = () => {
    let data = {};
    let payment = payments.filter(
      x => this.state.data.findIndex(y => y.payment.id == x.id) == -1,
    );
    if (payment.length > 0 && this._getRange() > 0) {
      data['amount'] =
        this.props.amount > 0 && this.state.isMax ? this._getRange() : '';
      if (this.state.data.length == 0) data['amount'] = this.props.amount;

      data['payment'] = payment[0];
      data['note'] = '';

      this.setState({data: [data].concat(this.state.data)});
    }
  };

  _onUpdateForm = (key, payment, value) => {
    console.log('payment', payment, value);
    let idx = this.state.data.findIndex(x => x.payment == payment);

    if (idx > -1) {
      if (key == 'amount' && this._getRange(payment['id']) < Number(value)) {
        showMessage({
          message: 'Lỗi nhập phương thức',
          description: 'Số tiền nhập phải nhỏ hơn tổng phí COD',
          type: 'warning',
        });

        return;
      }

      this.state.data[idx][key] = value;

      this.setState({data: this.state.data, visible: false});
    }
  };

  _getRange = (paymentId = 0) => {
    if (!this.props.isMax) return Math.pow(10, 10);
    let range = 0;
    let data = this.state.data.filter(x => x.payment['id'] != paymentId);
    if (data.length > 1) {
      range = data.reduce((a, b) => Number(a.amount) + Number(b.amount));
    } else if (data.length > 0) {
      range = data[0].amount;
    }

    return this.props.amount - range;
  };

  render() {
    const {data} = this.state;
    const {amount} = this.props;

    return (
      <View style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1}}>
          <FlatList
            data={data}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            renderItem={item => (
              <Form
                data={payments}
                {...item}
                updateForm={this._onUpdateForm}
                removeForm={this._onRemoveForm}
                onChangeType={val =>
                  this.setState({visible: true, payment: val})
                }
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{height: Metrics.margin.regular}} />
            )}
            keyExtractor={(item, index) => index}
            key={data.length}
          />
        </View>
        <AppButton
          onPress={this._onNewForm}
          text={'+ Thêm phương thức'}
          bold
          align={'left'}
          size={Fonts.size.h6}
          color={Colors.appPrimaryColor}
          textStyle={{marginLeft: Metrics.margin.large}}
        />
        <PaymentModal
          data={payments.filter(
            x => this.state.data.findIndex(y => y.payment == x) == -1,
          )}
          selected={this.state.payment}
          visible={this.state.visible}
          onClose={() => this.setState({visible: false})}
          onSelected={val =>
            this._onUpdateForm('payment', this.state.payment, val)
          }
        />
      </View>
    );
  }
}

class Form extends Component {
  render() {
    const {index, item, data} = this.props;
    const width = 120;
    return (
      <View style={styles.container_form}>
        <View style={styles.header_form}>
          <AppText text={'#' + (index + 1)} size={Fonts.size.h5} />
          <TouchableOpacity
            onPress={() => this.props.removeForm(item['payment'])}>
            <AntIcon name={'close'} size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.row_form}>
          <AppText style={{width}} text={'Phương thức'} size={Fonts.size.h6} />
          <TouchableOpacity
            onPress={() => this.props.onChangeType(item['payment'])}
            style={[
              styles.container_payments,
              {height: 55, justifyContent: 'center'},
            ]}>
            <AppText text={item['payment']['name']} size={Fonts.size.h6} />
          </TouchableOpacity>
        </View>
        <View style={styles.row_form}>
          <AppText style={{width}} text={'Tổng tiền'} size={Fonts.size.h6} />
          <AppInput
            format={formatPrice}
            placeholder={'0'}
            value={formatPrice(item['amount'])}
            bold
            size={Fonts.size.h5}
            height={55}
            border={0.8}
            onChangeText={val =>
              this.props.updateForm(
                'amount',
                item['payment'],
                val.replace(/[.]/g, ''),
              )
            }
            borderColor={Colors.appLightGrayColor}
            style={{paddingLeft: Metrics.margin.regular, flex: 1}}
            keyboardType={'decimal-pad'}
          />
        </View>
        <View style={styles.row_form}>
          <AppText style={{width}} text={'Ghi chú'} size={Fonts.size.h6} />
          <AppInput
            placeholder={''}
            value={item['note']}
            size={Fonts.size.h5}
            height={55}
            border={0.8}
            borderColor={Colors.appLightGrayColor}
            onChangeText={val =>
              this.props.updateForm('note', item['payment'], val)
            }
            style={{paddingLeft: Metrics.margin.regular, flex: 1}}
          />
        </View>
      </View>
    );
  }
}

class PaymentModal extends Component {
  render() {
    const {visible, data, selected} = this.props;
    return (
      <Modal
        isVisible={visible}
        style={[Styles.modal, {justifyContent: 'flex-end'}]}
        onBackdropPress={this.props.onClose}>
        <View style={{backgroundColor: Colors.appWhite}}>
          <View
            style={[
              styles.header_form,
              {paddingRight: Metrics.margin.regular},
            ]}>
            <AppText
              text={'Phương thức'}
              color={Colors.appColor}
              size={Fonts.size.h5}
              bold
            />
            <TouchableOpacity
              onPress={this.props.onClose}
              hitSlop={{left: 10, bottom: 10, right: 10, top: 10}}>
              <AntIcon name={'close'} size={22} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => this.props.onSelected(item)}
                style={styles.payment_item}>
                <AppText text={item['name']} size={Fonts.size.h6} />
                <View style={styles.circle}>
                  {item == selected ? <View style={styles.selected} /> : null}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    );
  }
}
