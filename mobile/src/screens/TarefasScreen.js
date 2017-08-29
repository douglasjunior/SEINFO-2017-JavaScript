import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid
} from 'react-native';
import axios from 'axios';

import TarefaSearch from '../components/TarefaSearch';
import TarefaList from '../components/TarefaList';

export default class TarefasScreen extends Component {

    state = {
        tarefas: []
    };

    componentDidMount() {
        this.requestTarefas();
    }

    onSearchClick = (value) => {
        this.textSearch = value;
        this.requestTarefas(value);
    }

    onItemClick = (item) => {

    }

    requestTarefas = (searchValue = '') => {
        return axios.get('/tarefas', {
            params: {
                titulo: searchValue
            }
        }).then((response) => {
            if (response.status === 200) {
                const { dados, total } = response.data;
                this.setState({ tarefas: dados, total: total, });
            } else {
                console.warn(response);
            }
        }).catch((ex) => {
            console.warn(ex);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TarefaSearch onSearchClick={this.onSearchClick} />

                <View style={{
                    height: 1,
                    marginTop: 20,
                    backgroundColor: '#ccc'
                }} />

                <TarefaList
                    dataSource={this.state.tarefas}
                    onItemClick={this.onItemClick} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5FCFF',
    }
});
