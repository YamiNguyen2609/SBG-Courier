import React, {Component} from 'react';
import {View, FlatList, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import IonIcon from 'react-native-vector-icons/Ionicons';
import r from 'reactotron-react-native';

import styles from './styles';
import {AppText, AppButton, Divider} from '../../../../../../components';
import {Fonts, Colors, Metrics, Styles} from '../../../../../../themes';

export default class ListOrderForm extends Component {
  state = {};

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <View style={styles.item_title}>
          <Text style={{flex: 1}}>
            <AppText text={'Bill '} size={Fonts.size.h6} />
            <AppText
              text={item['code']}
              color={Colors.appColor}
              size={Fonts.size.h5}
            />
          </Text>
          {true ? (
            <AppButton
              borderColor={Colors.appColorFd}
              border={0.8}
              height={35}
              width={35}
              onPress={() =>
                this.props.onPressCamera(item['code'], item['images'])
              }
              renderItem={
                <View style={[{flex: 1}, Styles.center]}>
                  <IonIcon
                    name={'ios-add'}
                    size={22}
                    color={Colors.appColorFd}
                  />
                </View>
              }
            />
          ) : null}
        </View>
        <Divider height={0.8} width={'100%'} />
        <FlatList
          style={styles.container_image}
          data={item['images']}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={(itemChild, idx) => {
            return (
              <AppButton
                key={idx}
                width={110}
                height={80}
                style={styles.image}
                onPress={() =>
                  this.props.onPressDetail(item['code'], idx, item['images'])
                }
                renderItem={
                  <FastImage
                    // source={{uri: thumbs[item]}}
                    source={{uri: itemChild.item.uri}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: Metrics.borderRadius.regular,
                    }}
                  />
                }
              />
            );
          }}
        />
      </View>
    );
  };

  render() {
    const {data} = this.props;
    return (
      <FlatList
        refreshing={false}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.props.onLoadMore(true)}
        onEndReached={() => this.props.onLoadMore(false)}
        onEndReachedThreshold={0.2}
        data={data}
        keyExtractor={(item, index) => item['code']}
        renderItem={this._renderItem}
      />
    );
  }
}
