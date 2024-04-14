import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {THEME_COLOR, WHITE} from '../utils/Color';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const ViewPhoto = () => {
  const route = useRoute();
  const navgiation = useNavigation();
  // console.log("view photo", route.params.data)
  const item = route.params.data;

  const downloadFile = () => {
    const date = new Date().getTime();
    console.log(date);
    const path = RNFS.DownloadDirectoryPath + '/pexel_img_' + date + '.jpg';
    RNFS.downloadFile({
      fromUrl: item.src.original,
      toFile: path,
    })
      .promise.then(result => {
        console.log('file downloaded suceessfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={THEME_COLOR} />
      <Image source={{uri: item.src.original}} style={styles.photo} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navgiation.goBack();
          }}>
          <Image source={require('../images/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              downloadFile();
            }}>
            <Image
              source={require('../images/download.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backBtn, {marginLeft: 20}]}
            onPress={() => {
              Share.open({
                title: 'Image Share',
                url: item.src.original,
              })
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  err && console.log(err);
                });
            }}>
            <Image
              source={require('../images/share.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.photographer}>
        {'Photographer: ' + item.photographer}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    position: 'absolute',
    marginTop: 40,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  backBtn: {
    height: 50,
    width: 50,
    backgroundColor: WHITE,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  photographer: {
    fontSize: 24,
    position: 'absolute',
    color: 'white',
    bottom: 50,
    alignSelf: 'center',
  },
});

export default ViewPhoto;
