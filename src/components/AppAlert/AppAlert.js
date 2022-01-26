import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import Modal from 'react-native-modal';

import AppButton from '../AppButton';
import AppText from '../AppText';
import Divider from '../Divider';
import styles from './styles';
import {Colors, Metrics, Fonts} from '../../themes';
import {isTablet} from '../../themes/iPhoneXHelper';

const RenderItem = ({data}) => {
  return data;
};

export default class AppAlert extends Component {
  state = {};
  render() {
    const {
      visible,
      title,
      align,
      description,
      renderItem,
      renderButton,
      horizontal,
    } = this.props;

    return (
      <Modal
        isVisible={visible}
        style={styles.modal}
        animationInTiming={250}
        animationIn="zoomInUp"
        animationOut="zoomOutUp"
        onBackdropPress={this.props.onBackProp}
        animationOutTiming={250}>
        <View style={styles.container}>
          {title ? (
            isTablet() ? (
              <AppText
                style={styles.tittle}
                bold
                text={title}
                size={Fonts.size.h4}
                align="center"
              />
            ) : (
              <AppText style={styles.tittle} bold text={title} align="center" />
            )
          ) : null}
          {description ? (
            isTablet() ? (
              <AppText
                text={description}
                style={styles.description}
                align={align ? align : 'left'}
                size={Fonts.size.h5}
              />
            ) : (
              <AppText
                text={description}
                style={styles.description}
                align={align ? align : 'left'}
              />
            )
          ) : null}
          {renderItem ? <RenderItem data={renderItem} /> : null}
          {!horizontal ? (
            <Divider
              height={0.8}
              width={Metrics.screenWidth - Metrics.margin.regular * 2}
              color={Colors.overlay2}
            />
          ) : null}
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={renderButton}
            horizontal={horizontal}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              return (
                <AppButton
                  key={index}
                  style={horizontal ? styles.button : null}
                  onPress={item.onPress}
                  borderRadius={0}
                  height={item.height ?? (isTablet() ? 70 : 50)}
                  size={isTablet() ? Fonts.size.h5 : Fonts.size.regular}
                  width={
                    horizontal
                      ? (Metrics.screenWidth -
                          Metrics.margin.large * 2 -
                          0.8 * (renderButton.length - 1)) /
                        renderButton.length
                      : Metrics.screenWidth - Metrics.margin.large * 2
                  }
                  text={item.title}
                />
              );
            }}
            ItemSeparatorComponent={() => {
              return horizontal ? (
                <Divider
                  width={0.8}
                  height={isTablet() ? 70 : 50}
                  color={Colors.overlay2}
                />
              ) : (
                <Divider height={0.8} color={Colors.overlay2} />
              );
            }}
          />
        </View>
      </Modal>
    );
  }
}
