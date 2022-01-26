import React, {Component} from 'react';
import {FlatList, View, TouchableOpacity, Text} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import r from 'reactotron-react-native';

import styles from './styles';
import {AppText, AppButton, Divider} from '../../../../../../components';
import {Fonts, Colors, Styles, Metrics} from '../../../../../../themes';
import ReasonNoteForm from '../ReasonNoteForm';
import ProcessSpecialForm from '../ProcessSpecialForm';

export default class ListImageForm extends Component {
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item['id']}
        activeOpacity={1}
        disabled={item.isUpload}
        hitSlop={{top: 5, left: 5, bottom: 5, right: 5}}
        style={styles.button_image}
        onPress={() => this.props.onTargetImage(item.id)}>
        <FastImage
          style={styles.image}
          source={{uri: item.isUpload ? item.uri : item.base64}}>
          {item.isUpload ? (
            <View style={styles.img_remove} />
          ) : item.isCheck ? (
            <View style={styles.img_check}>
              <View style={styles.icon_check}>
                <AntIcon name="check" size={20} color={Colors.appWhite} />
              </View>
            </View>
          ) : null}
        </FastImage>
      </TouchableOpacity>
    );
  };

  render() {
    const {barCode, images} = this.props;

    return images.length > 0 ? (
      <View
        style={{
          borderTopLeftRadius: Metrics.borderRadius.large,
          borderTopRightRadius: Metrics.borderRadius.large,
          height: 190,
          backgroundColor: Colors.appWhite,
          width: Metrics.screenWidth,
        }}>
        <View
          style={{
            // marginBottom: Metrics.margin.regular,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...styles.barCode,
          }}>
          <AppText
            text={barCode}
            size={Fonts.size.h4}
            color={Colors.appColor}
            bold={true}
          />
          <AppButton
            onPress={() => this.props.imageHandle(false)}
            height={46}
            width={46}
            borderColor={Colors.appRed}
            renderItem={
              <View style={[Styles.center, {flex: 1}]}>
                <FeatherIcon name={'trash-2'} size={34} color={Colors.appRed} />
              </View>
            }
          />
        </View>
        <FlatList
          keyExtractor={(item, index) => item['id']}
          data={images}
          renderItem={this._renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    ) : (
      <Text style={styles.barCode}>
        <AppText
          text="Bill "
          size={Fonts.size.h4}
          color={Colors.overlay5}
          align="left"
          bold={true}
        />
        <AppText
          text={barCode}
          size={Fonts.size.h4}
          color={Colors.appColor}
          bold={true}
        />
      </Text>
    );
  }
}
