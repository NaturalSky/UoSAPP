import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
} from "react-native";

class InfoScreen extends Component {
    static navigationOptions = {
        title: 'Info',
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
          }
    };

    render() {
        return (
          <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
            <View style={{flex: 1, marginBottom: 10}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>Intro:</Text>
                <Text>{"\n"}A small App made to showcase a basic understanding of programming as well as to refresh my skills.</Text>
                <Text>{"\n"}The App is based on an idea for a turn based RTS game where players take turns controlling armies of units to battle one another.</Text>
                <Text>{"\n"}Here you can create two of those army units and see how the fair against eachother.{"\n"}</Text>
            </View>
            <View style={{flex: 1, marginBottom: 10}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>Planned Updates:</Text>
                <Text>{"\n"}Globalize the stylesheet so the App looks more uniform.</Text>
                <Text>{"\n"}Remove any remaining hardcoded functions and variables.</Text>
                <Text>{"\n"}Make the App more intuitive to use.{"\n"}</Text>
            </View>
          </View>
        );
    }
}

export default InfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
});
