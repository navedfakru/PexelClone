import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { THEME_COLOR } from '../utils/Color';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(()=> {
      navigation.navigate("Home")
    }, 2000)
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={THEME_COLOR} barStyle={'dark-content'} />
      <Image source={require('../images/logo.png')} style={styles.log} />
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLOR
  },
  log: {
    width: '80%',
    height: '40%'
  }
})