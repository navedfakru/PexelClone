import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from './screens/Splash'
import Home from './screens/Home'
import ViewPhoto from './screens/ViewPhoto'
import ViewVideo from './screens/ViewVideo'
import Search from './screens/Search'
const stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <stack.Screen name='Search' component={Search} options={{ headerShown: false }} />
        <stack.Screen name='ViewPhoto' component={ViewPhoto} options={{ headerShown: false }} />
        <stack.Screen name='ViewVideo' component={ViewVideo} options={{ headerShown: false }} />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator