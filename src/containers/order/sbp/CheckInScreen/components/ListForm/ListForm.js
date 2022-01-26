import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';
import {Fonts, Styles, Colors, Metrics} from '../../../../../../themes';
import {
  AppButton,
  AppText,
  IconBack,
  Divider,
} from '../../../../../../components';

export default class ListForm extends Component {
  render() {
    const {visible, data} = this.props;
    return (
      <Modal isVisible={visible} style={Styles.modal}>
        <View style={styles.container}>
          <IconBack
            style={styles.logoBack}
            onPress={this.props.close}
            color={Colors.appWhite}
          />
          <View style={styles.header}>
            <AppText
              text={'Danh sách HAWB'}
              size={Fonts.size.h5}
              color={Colors.appWhite}
            />
          </View>
          <FlatList
            data={[...new Set(data)]}
            ItemSeparatorComponent={() => <Divider height={0.8} />}
            renderItem={({item, index}) => (
              <View style={styles.container_item}>
                <AppText text={item['HAWB']} size={Fonts.size.h5} />
                <AppText
                  text={item['createdAt'].split(' ')[1]}
                  size={Fonts.size.h5}
                />
              </View>
            )}
          />
          <View style={{paddingVertical: Metrics.margin.regular}}>
            <AppButton
              text={'Kết thúc'}
              width={Metrics.screenWidth - Metrics.margin.large * 2}
              bgColor={Colors.appColor}
              color={Colors.appWhite}
              size={Fonts.size.h6}
              onPress={() =>
                this.props.onFinishScan([...new Set(data.map(e => e['HAWB']))])
              }
              style={{marginHorizontal: Metrics.margin.large}}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
