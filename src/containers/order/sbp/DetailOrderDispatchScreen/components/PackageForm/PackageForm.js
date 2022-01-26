import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import r from 'reactotron-react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {AppText, AppInput, IconBack} from '../../../../../../components';
import {Fonts, Metrics, Colors} from '../../../../../../themes';

export default class PackageForm extends Component {
  state = {
    width: '',
    height: '',
    long: '',
    weight: '',
    isCreate: false,
  };

  componentDidMount() {
    setTimeout(() => {
      const {height, width, long, weight, isCreate} = this.props.item;
      this.setState({
        width: width ? width.toString() : '',
        height: height ? height.toString() : '',
        long: long ? long.toString() : '',
        weight: weight ? weight.toString() : '',
        isCreate: isCreate,
      });
    }, 200);
  }

  _onTextChange = (key, value) => {
    this.setState({[key]: value}, () => {
      const {height, width, long, weight, isCreate} = this.state;
      if (height && width && long && weight) {
        this.props.onUpdateOrder(
          {height, width, long, weight, isCreate},
          this.props.index,
          true,
        );
      }
    });
  };

  render() {
    const {length, item, index, isComplete, style} = this.props;
    const {isCreate} = item;
    const {height, width, long, weight} = this.state;

    console.log(isComplete);

    return (
      <View style={[styles.card, style]} key={'payment' + index}>
        <View style={styles.header}>
          <AppText
            size={Fonts.size.h6}
            text={'kiện ' + (index + 1) + '/' + length}
            bold
            color={Colors.appColor}
            size={Fonts.size.h6}
          />
          {isCreate ? (
            <IonIcon
              name="ios-close-circle-outline"
              style={styles.iconBack}
              size={Fonts.size.h3}
              color={Colors.appRed}
              onPress={() => this.props.onUpdateOrder(null, index)}
            />
          ) : null}
        </View>
        <View>
          <AppText
            size={Fonts.size.h6}
            text="Kích thước (cm) "
            style={{flex: 1}}
            color={Colors.overlay6}
          />
          {!isComplete ? (
            <View style={styles.container_input}>
              <AppInput
                value={width}
                onChangeText={val => this._onTextChange('width', val)}
                textAlign={'center'}
                style={styles.input}
                placeholder={'Dài'}
                height={40}
                width={50}
                size={Fonts.size.h6}
                keyboardType={'number-pad'}
              />
              <AppText
                size={Fonts.size.h6}
                text="x"
                color={Colors.overlay6}
                bold
              />
              <AppInput
                value={long}
                onChangeText={val => this._onTextChange('long', val)}
                textAlign={'center'}
                style={styles.input}
                size={Fonts.size.h6}
                height={40}
                width={50}
                placeholder={'Rộng'}
                keyboardType={'number-pad'}
              />
              <AppText
                size={Fonts.size.h6}
                text="x"
                color={Colors.overlay6}
                bold
              />
              <AppInput
                value={height}
                onChangeText={val => this._onTextChange('height', val)}
                textAlign={'center'}
                style={styles.input}
                height={40}
                width={50}
                size={Fonts.size.h6}
                placeholder={'Cao'}
                keyboardType={'number-pad'}
              />
            </View>
          ) : (
            <View style={styles.container_input}>
              <AppText
                text={width ?? '0'}
                textAlign={'center'}
                size={Fonts.size.h6}
              />
              <AppText
                size={Fonts.size.h6}
                text="x"
                color={Colors.overlay6}
                bold
              />
              <AppText
                text={long ?? '0'}
                textAlign={'center'}
                size={Fonts.size.h6}
              />
              <AppText
                size={Fonts.size.h6}
                text="x"
                color={Colors.overlay6}
                bold
              />
              <AppText
                text={height ?? '0'}
                textAlign={'center'}
                size={Fonts.size.h6}
              />
            </View>
          )}
        </View>
        <View style={[styles.form, {paddingRight: Metrics.margin.regular - 1}]}>
          <AppText
            size={Fonts.size.h6}
            text="Trọng lượng (kg) "
            style={{flex: 1}}
            color={Colors.overlay6}
          />
          {!isComplete ? (
            <AppInput
              value={weight}
              onChangeText={val => this._onTextChange('weight', val)}
              style={{
                borderBottomColor: Colors.overlay2,
                borderBottomWidth: 0.8,
              }}
              size={Fonts.size.h6}
              keyboardType={'number-pad'}
              height={40}
              placeholder={'Cân nặng'}
              textAlign={'center'}
              width={'45%'}
            />
          ) : (
            <AppText text={weight} textAlign={'center'} size={Fonts.size.h6} />
          )}
        </View>
      </View>
    );
  }
}
