import React, {Component} from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import Permissions from 'react-native-permissions';
import VersionCheck from 'react-native-version-check';
import Orientation from 'react-native-orientation-locker';
import RNRestart from 'react-native-restart';
import codePush from 'react-native-code-push';

import Render from './components/Render';
import {showFlagMessage, hideFlagMessage} from '../../../redux/app';

export class UpdateScreen extends Component {
  state = {
    receivedBytes: 0,
    totalBytes: 0,
  };

  componentWillMount() {
    Orientation.lockToPortrait();

    codePush
      .checkForUpdate()
      .then(async update => {
        console.log('update', update);
        if (update) {
          this.props.showFlagMessage({
            message: 'Đã có bản cập nhật mới, vui lòng cập nhật',
            buttons: [
              {
                title: 'OK',
                onPress: () => {
                  this.props.hideFlagMessage();
                  this._syncData();
                },
              },
            ],
          });
        } else {
          this._navigateScreen();
          //await this._checkVersion();
        }
      })
      .catch(err => {
        this._navigateScreen();
      });
  }

  _syncData = () => {
    codePush.sync(
      {},
      status => {},
      ({receivedBytes, totalBytes}) => {
        console.log(receivedBytes, totalBytes);
        this.setState({receivedBytes, totalBytes}, () => {
          const {receivedBytes, totalBytes} = this.state;

          if (receivedBytes / totalBytes == 1) {
            this.props.showFlagMessage({
              message: 'Ứng dụng đã được cập nhật',
              buttons: [
                {
                  title: 'OK',
                  onPress: () => {
                    this.props.hideFlagMessage();
                    setTimeout(() => {
                      // RNRestart.Restart();
                      codePush.restartApp();
                    }, 300);
                  },
                },
              ],
            });
          }
        });
      },
    );
  };

  _checkVersion = async () => {
    try {
      var version = await VersionCheck.needUpdate();
      if (version.isNeeded) {
        this.props.showFlagMessage({
          message: 'Đã có bản cập nhật mới, vui lòng cập nhật',
          buttons: [
            {
              title: 'OK',
              onPress: () => {
                this.props.hideFlagMessage();
                setTimeout(() => {
                  this._getStoreApp();
                }, 300);
              },
            },
          ],
        });
      } else {
        this._navigateScreen();
      }
    } catch {
      this._navigateScreen();
    }
  };

  _getStoreApp = () => {
    if (Platform.OS == 'ios') {
      // var link = 'https://apps.apple.com/us/app/qb-driver/id1481823473?uo=4';
    } else {
      link =
        'https://play.google.com/store/apps/details?id=com.sbp.fedexmobile';
    }
    Linking.openURL(link);
    RNRestart.Restart();
  };

  _navigateScreen = () => {
    this.props.onUpdate(false);
  };

  render() {
    const {receivedBytes, totalBytes} = this.props;

    return <Render byteProcess={receivedBytes / totalBytes} />;
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  showFlagMessage,
  hideFlagMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateScreen);
