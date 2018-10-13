import React, {StyleSheet, Platform, StatusBar} from 'react-native'

export default StyleSheet.create({
    androidBar: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: 'black',
    },
    loadingScreen: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    battleContainer: {
        flex: 1, 
        flexDirection: 'row', 
        padding: 10,
    },
    infoContainer: {
        flex: 1, 
        flexDirection: 'column', 
        padding: 10,
    },
    headerText: {
        fontSize: 17, 
        fontWeight: 'bold',
    },
    centerContent: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
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
})