import React from 'react';
import { StyleSheet, View, Text, Platform, StatusBar} from 'react-native';
import { createStackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen';
import BattleScreen from './screens/BattleScreen';
import DataScreen from './screens/DataScreen';
import UnitSelectionLeft from './screens/UnitSelectionLeft';
import UnitSelectionRight from './screens/UnitSelectionRight';
import InfoScreen from './screens/InfoScreen';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state =
            { 
                isLoading: true,
                loadingObjects: ['dataObject', 'componentObject', 'effectivenessObject'],
                CellArray: [],
                componentObject: [],
                dataObject: [],
                effectivenessObject: [],
            }
    }

    fetchData(url, objectName){
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
              this.splitData(responseJson, objectName);
          })
          .catch((error) =>{
              console.error(error);
        });
    }

    splitData(responseJson, objectName){
        const { dataObject, componentObject, effectivenessObject, loadingObjects } = this.state;
        var SheetSize = this.getSheetSize(responseJson);

        for (y = 0; y < SheetSize.Height; y++) {
            this.state.CellArray = [];
            for (i = 0; i < SheetSize.Width; i++) {
                var joined = this.state.CellArray.concat(responseJson.feed.entry[i+SheetSize.Width+(SheetSize.Width*y)].content.$t);
                this.setState({ CellArray: joined })
            }     
            
            var stateObject = dataObject;
            if(objectName == 'componentObject'){
                stateObject = componentObject;
                var obj = { one: '', two: '', three: '', four: '', }; 
            }else if(objectName == 'effectivenessObject'){
                stateObject = effectivenessObject;
                var obj = { A: '', B: '', C: '', D: '', E: '', F: '', G: ''};
            }else if(objectName == 'dataObject'){
                stateObject = dataObject;
                var obj = { Component: '', Class: '', Name: '', HP: '', Shld: '', Atk: '', Acc: '', MinR: '', MaxR: '', Def: '', Eva: '', Spd: '', Type: '', Cost: '', Tag1: '', Tag2: '', Compatibility: '', Tag4: '', Description: '', Image: ''};
            }

            var C = this.state.CellArray;
            for (z = 0; z < C.length; z++) {
                obj[Object.keys(obj)[z]] = C[z]
            }  
            
            stateObject.push(obj);  
        }

        for (i = 0; i < loadingObjects.length; i++) {
            if(loadingObjects[i] == objectName){
                loadingObjects.splice(i, 1);
            }
        }
        var state = true;
        if (loadingObjects.length == 0) {
            state = false;
        }

        this.setState({
            isLoading: state,
            componentObject: componentObject,
            effectivenessObject: effectivenessObject,
            dataObject: dataObject,
        });
    }

    getSheetSize(responseJson){
        var SheetWidth = 0;
        var SheetHeight = 0;
        var SheetLength = responseJson.feed.openSearch$totalResults.$t;

        for (i = 0; i < SheetLength; i++) {
            if(responseJson.feed.entry[i].title.$t == "A2"){
                SheetWidth = i
                break;
            } 
        }

        SheetHeight = ( SheetLength / SheetWidth ) - 1
        return { Width: SheetWidth, Height: SheetHeight };
    }

    componentWillMount(){
        this.fetchData('https://spreadsheets.google.com/feeds/cells/14oiZXJSe06hsWWlIUDUksN5aTQ4BQe_xw3pE3d7TwbI/6/public/basic?hl=en_US&alt=json', 'dataObject');
        this.fetchData('https://spreadsheets.google.com/feeds/cells/14oiZXJSe06hsWWlIUDUksN5aTQ4BQe_xw3pE3d7TwbI/5/public/basic?hl=en_US&alt=json', 'componentObject');
        this.fetchData('https://spreadsheets.google.com/feeds/cells/14oiZXJSe06hsWWlIUDUksN5aTQ4BQe_xw3pE3d7TwbI/4/public/basic?hl=en_US&alt=json', 'effectivenessObject');
    }

    render() {
        const { dataObject, componentObject, effectivenessObject } = this.state;

        let passedData = {
            dataObject: dataObject,
            componentObject: componentObject,
            effectivenessObject: effectivenessObject,
        }

        if (!this.state.isLoading) {
            return (
                <View style = {styles.container}>
                    <AppStackNavigator screenProps={passedData}/>
                </View>
            );
        }else
        {
            return (
                <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Loading...</Text>
                </View>
            );
        }
    }

}

const AppStackNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    Battle: { screen: BattleScreen },
    UnitSelectionLeft: { screen: UnitSelectionLeft },
    UnitSelectionRight: { screen: UnitSelectionRight },
    Data: { screen: DataScreen },
    Info: { screen: InfoScreen },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: 'black',
  },
});
