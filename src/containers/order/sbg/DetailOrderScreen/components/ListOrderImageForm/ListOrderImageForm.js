import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import r from 'reactotron-react-native';
import ImageZoom from 'react-native-two-finger-image-zoom';

import styles from './styles';
import {Metrics, Colors, Styles} from '../../../../../../themes';

export default class ListOrderImageForm extends Component {
  state = {idex: 0};

  UNSAFE_componentWillReceiveProps = nextProps => {
    this.setState({idex: idx});
  };

  render() {
    const {images, idx, data} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, ...Styles.center}}>
          <ImageZoom
            cropWidth={Metrics.screenWidth}
            cropHeight={Metrics.screenWidth}
            imageWidth={Metrics.screenWidth}
            imageHeight={Metrics.screenWidth}>
            <FastImage
              source={{uri: data[this.state.idex].uri}}
              style={styles.image}
            />
          </ImageZoom>
        </View>
        <View style={styles.container}>
          <FlatList
            data={images}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => this.setState({idex: index})}>
                  <FastImage
                    style={[
                      styles.imagePagination,
                      index == this.state.idex
                        ? {
                            borderWidth: 2,
                            borderColor: Colors.appColor,
                          }
                        : null,
                    ]}
                    source={{uri: item.uri}}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}
