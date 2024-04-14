import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BLACK, THEME_COLOR, WHITE} from '../utils/Color';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const ViewVideo = () => {
  const route = useRoute();
  const navgiation = useNavigation();
  const [isClicked, setIsClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);

  // console.log("view video", route.params.data)
  const item = route.params.data;
  useEffect(() => {
    const unsubscribe = navgiation.addListener('beforeRemove', e => {
      setPaused(true);
    });
    return () => unsubscribe();
  });
  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
      }, 5000);
    }
  }, [isClicked]);
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const downloadFile = () => {
    const date = new Date().getTime();
    console.log(date);
    const path = RNFS.DownloadDirectoryPath + '/pexel_video_' + date + '.mp4';
    RNFS.downloadFile({
      fromUrl: item.video_files[0].link,
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
                title: 'Video Share',
                url: item.video_files[0].link,
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
      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoView}
        onPress={() => {
          setIsClicked(true);
        }}>
        <Video
          resizeMode="cover"
          source={{uri: item.video_files[0].link}}
          style={styles.video}
          paused={paused}
          onProgress={x => {
            // console.log(x)
            setProgress(x);
            if (x.currentTime === x.seekableDuration) {
              setPaused(true);
            }
          }}
        />
        {isClicked && (
          <TouchableOpacity
            style={[
              styles.videoView,
              {
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                setPaused(!paused);
              }}>
              <Image
                source={
                  paused
                    ? require('../images/play-button.png')
                    : require('../images/pause-button.png')
                }
                style={styles.playBtn}
              />
            </TouchableOpacity>
            <View style={styles.sliderView}>
              <Text style={styles.time}>
                {progress ? format(progress.currentTime) : null}
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                value={progress.currentTime}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#9e9e9e"
              />
              <Text style={styles.time}>
                {progress ? format(progress.seekableDuration) : null}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Text style={styles.photographer}>
        {'Photographer: ' + item.user.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 10,
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
    fontSize: 18,
    position: 'absolute',
    color: 'white',
    bottom: 50,
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
  videoView: {
    width: '100%',
    height: 200,
  },
  playBtn: {
    width: 40,
    height: 40,
    tintColor: WHITE,
  },
  sliderView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  time: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  slider: {
    width: '75%',
    height: 40,
  },
});

export default ViewVideo;
