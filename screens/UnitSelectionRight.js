import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    Picker,
    TouchableOpacity,
    AsyncStorage,
} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import _ from 'lodash';

class UnitSelectionRight extends Component {
    constructor(props){
        super(props);
        this.state =
            { 
                classDropdown: [],
                classValue: 'Select Class',
                typeValue: '',
                weaponDropdown: ['Select Weapon'],
                armorDropdown: ['Select Armor'],
                engineDropdown: ['Select Engine'],
                dataObject: this.props.navigation.getParam('dataObject', 'data').dataObject,
                componentObject: this.props.navigation.getParam('dataObject', 'data').componentObject,
                weaponStats: { Component: 0, Class: 0, Name: '', Atk: 0, Acc: 0, Def: 0, Eva: 0, Spd: 0, WeaponType: '', ArmorType: '', Cost: 0 },
                armorStats: { Component: 0, Class: 0, Name: '', Atk: 0, Acc: 0, Def: 0, Eva: 0, Spd: 0, WeaponType: '', ArmorType: '', Cost: 0 },
                engineStats: { Component: 0, Class: 0, Name: '', Atk: 0, Acc: 0, Def: 0, Eva: 0, Spd: 0, WeaponType: '', ArmorType: '', Cost: 0 },
                unitStats: { Component: 0, Class: 0, Name: '', Atk: 0, Acc: 0, Def: 0, Eva: 0, Spd: 0, WeaponType: '', ArmorType: '', Cost: 0 }
            }
    }

    static navigationOptions = {
        title: 'Defender',
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
          }
    };

    componentWillMount(){
        const navigation = this.props.navigation;
        var componentObject = navigation.getParam('dataObject', 'data').componentObject;
        this.state.classDropdown = [{
            value: componentObject[0].one,
        }, {
            value: componentObject[0].two,
        }, {
            value: componentObject[0].three,
        }, {
            value: componentObject[0].four,
        }];
    }

    componentDidMount(){
        AsyncStorage.getItem("classDefender").then((value) => {
            this.setState({classValue: value});
        }).done();
        AsyncStorage.getItem("weaponDefender").then((value) => {
            this.setState({weaponDropdown: [value]});
        }).done();
        AsyncStorage.getItem("armorDefender").then((value) => {
            this.setState({armorDropdown: [value]});
        }).done();
        AsyncStorage.getItem("engineDefender").then((value) => {
            this.setState({engineDropdown: [value]});
        }).done();
        AsyncStorage.getItem("totalStatsDefender").then((value) => {    
            if(value != null){
                this.setState({unitStats: JSON.parse(value)});
            }
        }).done();     
    }

    classSelect(){
        const { dataObject, classValue } = this.state;
        const firstIndex = _.findIndex(dataObject, function(o) { return o.Component == classValue; });
        const lastIndex = _.findLastIndex(dataObject, function(o) { return o.Component == classValue; });
        var currentClass = dataObject[firstIndex].Class;     
        var dropdownIndex = 0;
        
        this.state.weaponDropdown = [], this.state.armorDropdown = [], this.state.engineDropdown = [];
        var dropdownArray = [this.state.weaponDropdown, this.state.armorDropdown, this.state.engineDropdown];
        for (i = firstIndex; i < lastIndex+1; i++) {
            if(dataObject[i].Class != currentClass){
                currentClass = dataObject[i].Class;
                dropdownIndex++;           
            }
            dropdownArray[dropdownIndex].push(dataObject[i].Name);
        }
    }

    unitSelect(type){
        var { dataObject, typeValue, unitStats, weaponStats, armorStats, engineStats} = this.state;
        let obj = dataObject.find(o => o.Name === typeValue);
        if(type == 'Weapon'){
            this.state.weaponStats = { Component: obj.Component, Class: obj.Class, Name: obj.Name, Atk: obj.Atk, Acc: obj.Acc, Def: obj.Def, Eva: obj.Eva, Spd: obj.Spd, WeaponType: obj.Type, Cost: obj.Cost};
        }else if(type == 'Armor'){
            this.state.armorStats = { Component: obj.Component, Class: obj.Class, Name: obj.Name, Atk: obj.Atk, Acc: obj.Acc, Def: obj.Def, Eva: obj.Eva, Spd: obj.Spd, ArmorType: obj.Type, Cost: obj.Cost};
        }else if(type == 'Engine'){
            this.state.engineStats = { Component: obj.Component, Class: obj.Class, Name: obj.Name, Atk: obj.Atk, Acc: obj.Acc, Def: obj.Def, Eva: obj.Eva, Spd: obj.Spd, Cost: obj.Cost};
        }
        
        var objx = {};
        var objB = this.state.unitStats;
        var obj1 = this.state.weaponStats;
        var obj2 = this.state.armorStats;
        var obj3 = this.state.engineStats;
        
        Object.keys(objB).map(function(a){
            objx[a] = Number(obj1[a]) + Number(obj2[a]) +  Number(obj3[a]); 
        })
        objx.ArmorType = obj1.WeaponType;
        objx.WeaponType = obj2.ArmorType
        this.state.unitStats = objx;
        AsyncStorage.setItem("totalStatsDefender", JSON.stringify(objx));
    }

    render(){
        const navigation = this.props.navigation;
        var componentObject = navigation.getParam('dataObject', 'Data').componentObject;
        var item = this.state.unitStats;

        return (
          <View style={{padding: 10}}>
                <ModalDropdown 
                    style={{height: 70}}
                    textStyle={{fontSize: 17, fontWeight: 'bold'}}
                    defaultValue={this.state.classValue}
                    options={[componentObject[0].one, componentObject[0].two, componentObject[0].three, componentObject[0].four]}
                    onSelect={(index, value) => { 
                        AsyncStorage.setItem("classDefender", value);
                        this.setState({
                            classValue: value,
                        });
                        this.state.classValue = value;
                        this.classSelect();
                    }}
                /> 
                <ModalDropdown
                    style={{height: 70}}
                    textStyle={{fontSize: 17, fontWeight: 'bold'}}
                    defaultValue = {this.state.weaponDropdown[0]}
                    options={this.state.weaponDropdown}
                    onSelect={(index, value) => {
                        AsyncStorage.setItem("weaponDefender", value);
                        this.setState({
                        typeValue: value,
                    });
                        this.state.typeValue = value;
                        this.unitSelect('Weapon');
                    }}
                />
                <ModalDropdown 
                    style={{height: 70}}
                    textStyle={{fontSize: 17, fontWeight: 'bold'}}
                    defaultValue={this.state.armorDropdown[0]}
                    options={this.state.armorDropdown}
                    onSelect={(index, value) => {
                        AsyncStorage.setItem("armorDefender", value);
                        this.setState({
                        typeValue: value,
                    });
                    this.state.typeValue = value;
                    this.unitSelect('Armor');
                    }}
                />
                <ModalDropdown 
                    style={{height: 70}}
                    textStyle={{fontSize: 17, fontWeight: 'bold'}}
                    defaultValue={this.state.engineDropdown[0]}
                    options={this.state.engineDropdown}
                    onSelect={(index, value) => {
                        AsyncStorage.setItem("engineDefender", value);
                        this.setState({
                        typeValue: value,
                    });
                    this.state.typeValue = value;
                    this.unitSelect('Engine');
                    }}
                />
                <Text>
                {"\n"}
                    Attack:        {item.Atk + "\n"}
                    Accuracy:   {item.Acc + "\n"}
                    Defense:    {item.Def + "\n"}
                    Evasion:     {item.Eva + "\n"}
                    Speed:       {item.Spd + "\n"}
                    Cost:         {item.Cost}
                {"\n"}{"\n"}
                "Note: Dropdown defaultValue does not reset yet when you change the UnitClass, it is however populated correctly so simply open the dropdown to pick from the new item list."
                </Text>

          </View>
        );
    }
}


export default UnitSelectionRight

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
});