
//This screen lets us navigate to all other screens in the App.

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import styles from '../styles/Styles'

class HomeScreen extends Component {
    constructor(props){
        super(props);
    }

  static navigationOptions = {
     header: null
  }
   
  render() {
    return (
      <View style={styles.container}>
          <View style={{ flex:1 }}>
            <View style={styles.buttonRow}>
                <View style={{flex: 1}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('UnitSelectionLeft', { dataObject: this.props.screenProps })}
                        style={styles.touchableButton}
                        >
                        <View style = {styles.centerContent}>
                            <Text style={styles.headerText}> Attacker </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('UnitSelectionRight', { dataObject: this.props.screenProps })}
                        style={styles.touchableButton}
                        >
                        <View style = {styles.centerContent}>
                            <Text style={styles.headerText}> Defender </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonRow}>
                <View style={{flex: 1}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Battle', { dataObject: this.props.screenProps })}
                        style={styles.touchableButton}
                        >
                        <View style = {styles.centerContent}>
                            <Text style={styles.headerText}> Damage Calculations </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonRow}>
                <View style={{flex: 1}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Data', { dataObject: this.props.screenProps })}
                        style={styles.touchableButton}
                        >
                        <View style = {styles.centerContent}>
                            <Text style={styles.headerText}> Data List </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                     <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Info')}
                        style={styles.touchableButton}
                        >
                        <View style = {styles.centerContent}>
                            <Text style={styles.headerText}> App Info </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
      </View>
    );
  }
}

export default HomeScreen