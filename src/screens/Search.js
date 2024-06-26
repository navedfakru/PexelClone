import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BLACK, THEME_COLOR, WHITE} from '../utils/Color';
import Modal from 'react-native-modal';
import {SEARCH_PHOTOS, SEARCH_VIDEOS, searchData} from '../utils/Apis';
import PhotoGrid from '../components/PhotoGrid';
import VideoGrid from '../components/VideoGrid';

const Search = () => {
  const navgiation = useNavigation();
  const [type, setType] = useState(0);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const doSearch = () => {
    if (type == 0) {
      searchData(SEARCH_PHOTOS, search).then(res => {
        // console.log(res)
        setPhotos(res.photos);
      });
    } else {
      searchData(SEARCH_VIDEOS, search).then(res => {
        // console.log('Video', res);
        setVideos(res.videos);
      });
    }
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={THEME_COLOR} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navgiation.goBack();
        }}>
        <Image source={require('../images/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.serachBox}>
        <TouchableOpacity
          style={styles.dropBtn}
          onPress={() => {
            setShowTypeModal(true);
          }}>
          <Image
            source={
              type == 0
                ? require('../images/photo.png')
                : require('../images/play.png')
            }
            style={styles.typeIcon}
          />
          <Image
            source={require('../images/down.png')}
            style={[styles.typeIcon, {marginLeft: 10}]}
          />
        </TouchableOpacity>
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholder="Search here...."
        />
        {search != '' && (
          <TouchableOpacity
            onPress={() => {
              setSearch('');
              setPhotos([]);
              setVideos([]);
            }}>
            <Image
              source={require('../images/cross.png')}
              style={styles.typeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {search != '' && (
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            Keyboard.dismiss()
            doSearch();
          }}>
          <Text style={styles.searchTitle}>Search</Text>
        </TouchableOpacity>
      )}
      {type == 0 ? (
        <FlatList
          numColumns={2}
          data={photos}
          renderItem={({item, index}) => {
            return <PhotoGrid item={item} />;
          }}
        />
      ) : (
        <FlatList
          data={videos}
          numColumns={2}
          renderItem={({item, index}) => {
            return <VideoGrid item={item} />;
          }}
        />
      )}
      <Modal
        onBackdropPress={() => {
          setShowTypeModal(false);
        }}
        onBackButtonPress={() => {
          setShowTypeModal(false);
        }}
        isVisible={showTypeModal}
        backdropOpacity={0.3}
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.typeItem}
            onPress={() => {
              setType(0), setShowTypeModal(false);
            }}>
            <Image
              source={require('../images/photo.png')}
              style={styles.typeIcon}
            />
            <Text style={styles.title}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.typeItem}
            onPress={() => {
              setType(1), setShowTypeModal(false);
            }}>
            <Image
              source={require('../images/play.png')}
              style={styles.typeIcon}
            />
            <Text style={styles.title}>Videos</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default Search;

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
    backgroundColor: BLACK,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 15,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: WHITE,
  },
  photographer: {
    fontSize: 24,
    position: 'absolute',
    color: 'white',
    bottom: 50,
    alignSelf: 'center',
  },
  serachBox: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    borderColor: '#9e9e9e',
    alignItems: 'center',
  },
  typeIcon: {
    width: 20,
    height: 20,
  },
  input: {
    color: BLACK,
    marginLeft: 20,
    width: '65%',
  },
  dropBtn: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingLeft: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingRight: 10,
  },
  modalView: {
    width: '100%',
    height: 150,
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  typeItem: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    marginLeft: 15,
    fontSize: 16,
    color: BLACK,
    fontWeight: '500',
  },
  searchBtn: {
    width: '90%',
    height: 50,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 8,
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});
