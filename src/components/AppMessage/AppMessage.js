import React, {useState, Component} from 'react';
import {Animated, View} from 'react-native';

import {Styles, Colors, Metrics, Fonts} from '../../themes';
import AppText from '../AppText';

const FadeInView = props => {
  const [fadeAnim] = useState(new Animated.Value(1));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: props.time,
    }).start();
  }, []);
  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

export default class TextMessage extends Component {
  state = {
    visible: false,
    visibleCount: 0,
  };
  UNSAFE_componentWillReceiveProps = nextProp => {
    if (this.state.visibleCount !== nextProp.visible)
      this.setState({visible: true, visibleCount: nextProp.visible}, () => {
        setTimeout(() => {
          this.setState({visible: false});
        }, nextProp.time + 5);
      });
  };

  render() {
    const {color = Colors.appWhite, text, time} = this.props;
    const {visible} = this.state;

    return visible ? (
      <View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          Styles.center,
        ]}>
        <FadeInView
          time={time}
          style={{
            backgroundColor: Colors.overlay8,
            borderRadius: Metrics.borderRadius.regular,
            padding: Metrics.margin.huge,
          }}>
          <AppText
            text={text}
            color={color}
            size={(Metrics.screenWidth * 3.5) / 100}
          />
        </FadeInView>
      </View>
    ) : null;
  }
}
