
//This screen displays all the Google Sheets data in a clean list with a expanding function to show more data.

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import styles from '../styles/Styles'
import { Collapse,CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

class DataScreen extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'Data List',
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight 
        }
    };

    render() {
        const navigation = this.props.navigation; 

        return (
            <List>
                <FlatList
                    data={navigation.getParam('dataObject', 'Google Sheet Data').dataObject}
                    renderItem={({ item }) => (
                        <ListItem
                        title = {
                            <View>
                                <Collapse>
                                    <CollapseHeader>
                                      <View>
                                        <Text style = {styles.headerText}>{item.Name}</Text>
                                        <Text>{item.Component + " ~ " + item.Class}</Text>
                                      </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                      <Text>
                                        {"\n"}
                                        Attack:        {item.Atk + "\n"}
                                        Accuracy:   {item.Acc + "\n"}
                                        Defense:    {item.Def + "\n"}
                                        Evasion:     {item.Eva + "\n"}
                                        Speed:       {item.Spd + "\n"}
                                        Cost:         {item.Cost}
                                      </Text>
                                    </CollapseBody>
                                </Collapse>
                            </View>
                        }
                    />
                    )}
                />
            </List>
          );
    }
}

export default DataScreen 