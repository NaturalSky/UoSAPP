
//This screen shows the result of two units battling and how much damage they will take in the fight.

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    AsyncStorage,
} from "react-native";
import _ from 'lodash';

class BattleScreen extends Component {
    constructor(props){
        super(props);
        this.state =
            { 
                attackersHealth: [20, 20, 20, 20, 20],
                attackersRemainder: [20, 20, 20, 20, 20],
                defendersHealth: [20, 20, 20, 20, 20],
                defendersRemainder: [20, 20, 20, 20, 20],
                ratio: [1, 0.8, 0.6, 0.4, 0.2],
                attackersDamageTaken: 0,
                defendersDamageTaken: 0,
                remainingHealth: 100,
                effectivenessObject: this.props.navigation.getParam('dataObject', 'data').effectivenessObject,
                unitAttacker: { Component: 0, Class: 0, Name: '', Atk: 0, Acc: 0, Def: 0, Eva: 0, Spd: 0, Type: '', Cost: 0 },
                unitDefender: { Component: 0, Class: 0, Name: '', Atk: 0, Acc: 0, Def: 0, Eva: 0, Spd: 0, Type: '', Cost: 0 }
            }
    }

    static navigationOptions = {
        title: 'Battle Simulator',
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
          }
    };

    typeCalculation(engagement){
        const { unitAttacker, unitDefender, effectivenessObject } = this.state;
        var { attack, defense } = [];

        if(engagement == 'attacker'){
            attack = unitAttacker;
            defense = unitDefender;
        }else if(engagement == 'defender'){
            attack = unitDefender;
            defense = unitAttacker;
        }

        for (i = 1; i < effectivenessObject.length; i++) {
            if (Object.values(effectivenessObject[0])[i] == defense.ArmorType.slice(4)) {
                var value = (Object.entries(effectivenessObject.find(function (obj) { return obj.A === attack.WeaponType.slice(4); }))[i])[1];
                return value;
            }
        }

        return 1;
    }

    attackerCalculation(){
        var { unitAttacker, unitDefender, effectivenessObject, defendersHealth, defendersRemainder, ratio, defendersDamageTaken } = this.state;

        var attack = unitAttacker.Atk;
        if(attack != 0){
            var defense = 1 + unitDefender.Def;
            var attackMinDef = attack * (-(((defense/2)+(1*10))/100)+1);
            var attackType = attackMinDef * this.typeCalculation('attacker');
            var attackHealth = attackType;
            var evasion = 1 + unitDefender.Eva;
            var accuracy = Math.max(0, (unitAttacker.Acc - evasion));

            for (i = 0; i < defendersHealth.length; i++) {
                defendersHealth[i] = Math.round(20 + -Math.max(0, attackHealth/(100/accuracy)*ratio[i]));
                if(defendersHealth[i] < 0){defendersHealth[i] = 0}
                defendersRemainder[i] =  attackHealth-20+defendersHealth[i];
                attackHealth = defendersRemainder[i];
            }

            this.setState({
                defendersDamageTaken: 100 - defendersHealth.reduce((a, b) => a + b, 0),
            });
        }
    }

    defenderCalculation(){
        var { unitAttacker, unitDefender, effectivenessObject, attackersHealth, attackersRemainder, ratio, attackersDamageTaken, defendersDamageTaken } = this.state;

        var attack = unitDefender.Atk;
        if(attack != 0){
            var defense = 1 + unitAttacker.Def;
            var attackMinDef = attack * (-(((defense/2)+(1*10))/100)+1);
            var attackType = attackMinDef * this.typeCalculation('defender');
            var attackHealth = attackType * ((100 + -defendersDamageTaken)/100);
            var evasion = 1 + unitAttacker.Eva;
            var accuracy = Math.max(0, (unitDefender.Acc - evasion));


            for (i = 0; i < attackersHealth.length; i++) {
                attackersHealth[i] = Math.round(20 + -Math.max(0, attackHealth/(100/accuracy)*ratio[i]));
                if(attackersHealth[i] < 0){attackersHealth[i] = 0}
                attackersRemainder[i] =  attackHealth-20+attackersHealth[i];
                attackHealth = attackersRemainder[i];
            }

            this.setState({
                attackersDamageTaken: 100 - attackersHealth.reduce((a, b) => a + b, 0),
            });
        }
    }


    componentDidMount(){
        AsyncStorage.getItem("totalStatsAttacker").then((value) => {    
            if(value!= null){
                this.setState({unitAttacker: JSON.parse(value)});
            }
            AsyncStorage.getItem("totalStatsDefender").then((value) => {    
                if(value!= null){
                    this.setState({unitDefender: JSON.parse(value)});
                }
                this.attackerCalculation();
                this.defenderCalculation();
            }).done();
        }).done();
    }

    render() {
        const { attackersHealth, defendersHealth, attackersDamageTaken, defendersDamageTaken } = this.state;

        return (
          <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>Attackers:</Text>
                <Text>Unit 1:</Text>
                <Text>{attackersHealth[0]}</Text>
                <Text>Unit 2:</Text>
                <Text>{attackersHealth[1]}</Text>
                <Text>Unit 3:</Text>
                <Text>{attackersHealth[2]}</Text>
                <Text>Unit 4:</Text>
                <Text>{attackersHealth[3]}</Text>
                <Text>Unit 5:</Text>
                <Text>{attackersHealth[4] + "\n"}</Text>
                <Text>Damage Taken:</Text>
                <Text>{attackersDamageTaken}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>Defenders:</Text>
                <Text>Unit 1:</Text>
                <Text>{defendersHealth[0]}</Text>
                <Text>Unit 2:</Text>
                <Text>{defendersHealth[1]}</Text>
                <Text>Unit 3:</Text>
                <Text>{defendersHealth[2]}</Text>
                <Text>Unit 4:</Text>
                <Text>{defendersHealth[3]}</Text>
                <Text>Unit 5:</Text>
                <Text>{defendersHealth[4] + "\n"}</Text>
                <Text>Damage Taken:</Text>
                <Text>{defendersDamageTaken}</Text>
            </View>
          </View>
        );
    }
}

export default BattleScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
});
