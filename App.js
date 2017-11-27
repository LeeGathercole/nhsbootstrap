/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {WebView, Platform,StyleSheet,Text,View,Linking} from 'react-native';
import Button from 'react-native-button';
import AppLink from 'react-native-app-link';

import {StackNavigator} from 'react-navigation';

const HomeScreen = ({navigation}) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to NHS Online!
    </Text>
    <Text style={styles.instructions}>
      To get started, edit App.js
    </Text>
    <Button
      containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}}
      style={{fontSize: 20, color: 'white'}}
      styleDisabled={{color: 'red'}}
      onPress={() => onPressBookAppointment()}>
      Book an Appointment
    </Button>
    <Button
      containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'blue'}}
      style={{fontSize: 20, color: 'white'}}
      styleDisabled={{color: 'red'}}
      onPress={() => navigation.navigate('DataSharing')}>
      Data Sharing Options
    </Button>
  </View>
);

const OrganDonationScreen = () => (
  <WebView
    source={{uri: 'https://www.organdonation.nhs.uk//register-to-donate/'}}
    style={{marginTop: 20}}
  />
);

const TriageScreen = () => (
  <WebView
    source={{uri: 'https://111.service.nhs.uk'}}
    style={{marginTop: 20}}
  />
);

const DataSharingScreen = () => (
  <WebView
    source={{uri: 'https://ndop.herokuapp.com/app/prototypes/prototype-d/index.html'}}
    style={{marginTop: 20}}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


const RootNavigator = StackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions:{
      headerTitle: 'NHS Online' 
    }
  },
  DataSharing: { 
    screen: DataSharingScreen, 
    navigationOptions:{
      headerTitle: 'NHS Online' 
    }
  },
  OrganDonation: { 
    screen: OrganDonationScreen,
    navigationOptions:{
      headerTitle: 'NHS Online' 
    }
  },
  Triage: { 
    screen: TriageScreen,
    navigationOptions:{
      headerTitle: 'NHS Online' 
    }
  },  
});

function openExternalLink(url){
  console.warn(url);
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.warn('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }    
    })
    .catch(err => console.error('An error occurred', err));
};

function onPressBookAppointment(){
  var url, appName, appStoreId, playStoreId, appStoreLocale;

  appStoreId = 1038013974;
  playStoreId = 111111111;
  appStoreLocale = 'gb';
  appName = 'evergreen-life-phr';
  url = `${appName}://`;
  Linking.openURL(url).catch(err => {
    console.log(err);
    if (err.code === 'EUNSPECIFIED') {
      if (Platform.OS === 'ios') {
        console.log(`https://itunes.apple.com/${appStoreLocale}/app/${appName}/id${appStoreId}`);
        Linking.openURL(`https://itunes.apple.com/${appStoreLocale}/app/${appName}/id${appStoreId}`);
      } else {
        Linking.openURL(`https://play.google.com/store/apps/details?id=${playStoreId}`);
      }
    } else {
      throw new Error(`Could not open ${appName}. ${err.toString()}`);
    }
  });
};



export default RootNavigator;