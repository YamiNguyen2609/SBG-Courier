import React, {Component} from 'react';
import {Keyboard, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {AppInput, AppButton} from '../../../../../../components';
import {Colors, Fonts, Metrics, Styles} from '../../../../../../themes';

export default class SearchForm extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        {this.props.type == 2 ? (
          <AppButton
            bgColor={Colors.appColor}
            onPress={this.props.onPressOpen}
            height={50}
            width={50}
            style={{marginRight: Metrics.margin.regular}}
            renderItem={
              <View style={{flex: 1, ...Styles.center}}>
                <AntIcon
                  name="profile"
                  color={Colors.appWhite}
                  size={Fonts.size.h3}
                />
              </View>
            }
          />
        ) : null}
        <AppInput
          style={styles.input}
          placeholder={'Nhập mã để tìm kiếm'}
          size={Fonts.size.h6}
          ref={input => (this.input = input)}
        />
        <AppButton
          renderItem={
            <View
              style={[
                {flex: 1, paddingHorizontal: Metrics.margin.regular + 1},
                Styles.center,
              ]}>
              <IonIcon
                name="ios-search"
                size={Fonts.size.h2}
                color={Colors.appWhite}
              />
            </View>
          }
          height={50}
          width={50}
          bgColor={Colors.appColor}
          onPress={() => {
            Keyboard.dismiss();
            this.props.onBarCodeRead(String(this.input.value()));
          }}
        />
        {this.props.type == 0 ? (
          <AppButton
            bgColor={Colors.appColor}
            onPress={this.props.onPressOpen}
            height={50}
            width={50}
            style={{marginLeft: Metrics.margin.regular}}
            renderItem={
              <View style={{flex: 1, ...Styles.center}}>
                <AntIcon
                  name="check"
                  color={Colors.appWhite}
                  size={Fonts.size.h3}
                />
              </View>
            }
          />
        ) : null}
      </View>
    );
  }
}
