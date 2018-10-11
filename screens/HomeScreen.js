import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity,
} from "react-native";

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
                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold'}}> Attacker </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('UnitSelectionRight', { dataObject: this.props.screenProps })}
                        style={styles.touchableButton}
                        >
                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold'}}> Defender </Text>
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
                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold'}}> Damage Calculations </Text>
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
                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold'}}> Data List </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                     <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('Info')}
                        style={styles.touchableButton}
                        >
                        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold'}}> App Info </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
      //marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    padding: 10,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  touchableButton: { 
    margin: 20,
    height: '80%',
    backgroundColor: '#c7b8d6',
    borderWidth: 3,
    borderColor: '#1b0f38',
    borderRadius: 36,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  }
});