/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import axios from 'axios';

import TarefasScreen from './screens/TarefasScreen';

axios.defaults.baseURL = 'http://192.168.100.4:3001/';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TarefasScreen />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('mobile', () => App);
