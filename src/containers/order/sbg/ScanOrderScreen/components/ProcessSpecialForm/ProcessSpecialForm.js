import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppText} from '../../../../../../components';
import {Colors} from '../../../../../../themes';

export default class ProcessSpecialForm extends Component {
  state = {
    data: [],
    index: 1,
  };

  componentDidMount() {
    this.setState({
      data: this.props.data.map((e, idx) => {
        return {
          ...e,
          selected: e.id == this.state.index,
        };
      }),
    });
  }

  _onPressItem = item => {
    this.setState({
      data: this.state.data.map(e => {
        return {
          ...e,
          selected: item.id == e.id,
        };
      }),
    });
  };

  render() {
    const {data} = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, idx}) => {
            const {id, name, selected} = item;
            return (
              <TouchableOpacity
                onPress={() => this._onPressItem(item)}
                style={[
                  styles.item,
                  selected
                    ? {
                        backgroundColor: Colors.overlay1,
                      }
                    : null,
                ]}>
                <AppText text={name} />
                {selected ? (
                  <IonIcon
                    name="ios-checkmark"
                    size={28}
                    color={Colors.appWhite}
                  />
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
