import React, {Component} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import styles from './styles';
import {
  IconBack,
  AppText,
  AppInput,
  AppButton,
} from '../../../../../components';
import {Colors, Fonts, Metrics} from '../../../../../themes';
import ListIncidentForm from '../ListIncidentForm';

export default class Render extends Component {
  state = {
    focus: false,
  };

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', () =>
      this.setState({focus: false}),
    );
  }

  _onPressInput = () => {
    if (this.state.focus) {
      this.setState({focus: false}, () => this.input.blur());
    } else {
      this.setState({focus: true}, () => this.input.focus());
    }
  };

  _onPressSend = () => {
    const {code, name} = this.listForm.state.item;
    this.props.onPressReport(code, name, this.input.value());
  };

  render() {
    return (
      <View style={styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <View style={styles.header}>
          <AppText
            text={'Báo hỏng xe'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        {this.props.data.length > 0 ? (
          <ListIncidentForm
            ref={listForm => (this.listForm = listForm)}
            data={this.props.data
              .map((e, index) => {
                return {
                  ...e,
                  target: index == 0 ? true : false,
                };
              })
              .filter(e => e.id !== 'KET_XE')}
          />
        ) : null}
        <TouchableOpacity
          activeOpacity={1}
          onPress={this._onPressInput}
          style={styles.scrollView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              ref={input => (this.input = input)}
              bgColor={'transparent'}
              placeholder={'Ghi chú'}
              multiline={true}
              size={Fonts.size.h6}
            />
          </ScrollView>
        </TouchableOpacity>
        <View style={styles.button}>
          <AppButton
            text={'Gửi'}
            bgColor={Colors.appColor}
            color={Colors.appWhite}
            width={120}
            height={50}
            size={Fonts.size.h6}
            onPress={this._onPressSend}
          />
        </View>
      </View>
    );
  }
}
