import React, {Component} from 'react';
import {
  View,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import r from 'reactotron-react-native';

import styles from './styles';
import {AppButton, AppText, Divider} from '../../../../../../components';
import {Fonts, Colors, Metrics} from '../../../../../../themes';

export default class ReasonNoteForm extends Component {
  state = {
    selected: 0,
    data: [
      {
        id: 0,
        text: 'Không có ghi chú',
      },
    ],
    title: 'Không có ghi chú',
    isExpand: true,
  };

  _getNote = () => this.state;

  onSelect = item => {};

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    let items = [
      {
        id: 0,
        title: 'Không có ghi chú',
        selected: true,
      },
    ];

    items = items.concat(
      this.props.data.map(e => {
        return {
          ...e,
          selected: false,
        };
      }),
    );

    this.setState({
      selected: 0,
      data: items,
      title: 'Không có ghi chú',
      isExpand: true,
    });
  }

  _renderItem = ({item, index}) => {
    const {id, title, selected} = item;
    return !selected ? (
      <View>
        <AppButton
          text={title}
          size={Fonts.size.h5}
          align={'left'}
          onPress={() => this._changeOption(item)}
        />
        <Divider
          height={0.8}
          width={Metrics.screenWidth - Metrics.margin.small}
        />
      </View>
    ) : null;
  };

  _changeState = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isExpand: !this.state.isExpand,
    });
  };

  _changeOption = item => {
    this.setState({
      title: item.title,
      selected: item.id,
      data: this.state.data.map(e => {
        return {
          ...e,
          selected: e.id == item.id,
        };
      }),
    });
  };

  render() {
    const {data, isExpand, title} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.select}>
          <AppButton
            onPress={this._changeState}
            renderItem={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <AppText text={title} size={Fonts.size.h5} />
                <IonIcon
                  name={isExpand ? 'ios-arrow-up' : 'ios-arrow-down'}
                  size={30}
                  color={Colors.overlay2}
                  style={{
                    marginRight: Metrics.margin.regular,
                  }}
                />
              </View>
            }
          />
          {!isExpand ? (
            <View>
              <Divider
                height={0.8}
                width={Metrics.screenWidth - Metrics.margin.small * 2 - 1}
              />
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                key={data.length}
                keyExtractor={(item, index) => index}
                style={{height: data.length > 4 ? 300 : data.length * 60.8}}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
