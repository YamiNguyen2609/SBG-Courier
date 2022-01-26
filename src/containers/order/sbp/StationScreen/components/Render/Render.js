import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import r from 'reactotron-react-native';

import styles from './styles';
import {
  AppButton,
  AppText,
  IconBack,
  Divider,
} from '../../../../../../components';
import {Styles, Metrics, Colors, Fonts} from '../../../../../../themes';

export default class Render extends Component {
  state = {};
  render() {
    return (
      <View style={Styles.container}>
        <IconBack
          style={styles.logoBack}
          onPress={this.props.back}
          color={Colors.appWhite}
        />
        <View style={styles.header}>
          <AppText
            text={'Chọn trạm'}
            size={Fonts.size.h5}
            color={Colors.appWhite}
          />
        </View>
        <FlatList
          data={this.props.data}
          showsVerticalScrollIndicator={false}
          key={this.props.data.length}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <AppButton
              onPress={() => this.props.onPressSelect(index)}
              style={{paddingLeft: Metrics.margin.large}}
              text={item.name}
              align={'left'}
              height={70}
              bgColor={item.selected ? Colors.overlay1 : Colors.appWhite}
              borderRadius={0}
              size={Fonts.size.h6}
            />
          )}
          ItemSeparatorComponent={() => <Divider height={0.8} />}
        />
        <View style={{paddingVertical: Metrics.margin.regular}}>
          <AppButton
            text={'Tiếp tục'}
            width={Metrics.screenWidth - Metrics.margin.large * 2}
            bgColor={Colors.appColor}
            color={Colors.appWhite}
            size={Fonts.size.h6}
            style={{marginHorizontal: Metrics.margin.large}}
            onPress={this.props.onPressScan}
          />
        </View>
      </View>
    );
  }
}
