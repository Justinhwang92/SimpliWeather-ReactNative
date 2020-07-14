import React from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar, RefreshControl, Dimensions } from 'react-native';
import WeatherPanel from '../WeatherPanel/WeatherPanel';
import LocationPanelContainer from '../LocationPanel/LocationPanelContainer';

const Pages = () => {

  const weatherPanels = [];

  for (let i = 0; i < 2; ++i) {
    weatherPanels.push (
      <View key={i}>
        <WeatherPanel />
      </View>
    )
  }  
  
  return weatherPanels;
}

export default function AppWrapper(props) {

    const { colors } = props.theme;
    const barTextColor = colors.text === '#ffffff' ? 'light-content' : 'dark-content';
    const barColor = colors.background === '#121212' ? '#121212' : '#f6f6f6';

    return (
      <ScrollView style={{ backgroundColor: barColor }} refreshControl={ <RefreshControl tintColor="red" refreshing={ props.refreshing } onRefresh={ props.onRefresh } /> }>
        <View style={ [styles.contentWrapper, { backgroundColor: colors.background }] }>
            <StatusBar barStyle={barTextColor} backgroundColor={barColor} translucent={true} />

            <View style={ styles.HeaderWrapper}>
              <Text style={ [styles.HeaderTitle, { color: colors.text }] }>SimpliWeather</Text>
            </View>

            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={ (e) => props.setCurrentPage(e) }
              scrollEventThrottle={0}
            >

              <Pages hourlyWeatherData={props.hourlyWeatherData} /> 
            
            </ScrollView>
        
            <LocationPanelContainer style={ {backgroundColor: colors.background, color: colors.text } } isModalOpen={ props.locationName } />
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    HeaderTitle: {
        fontSize: 36,
    },
    HeaderWrapper: {
        paddingTop: 20,
        margin: "auto",
        alignItems: "center",
    },
    contentWrapper: {
        paddingTop: 20,
        padding: 10,
    },
});