import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import axios from 'axios';

import Divider from '../components/Divider';
import TarefaSearch from '../components/TarefaSearch';
import TarefaList from '../components/TarefaList';

export default class TarefasScreen extends Component {

    state = {
        tarefas: [],
        refreshing: false,
        showForm: false,
    };

    componentDidMount() {
        this.requestTarefas();
    }

    onSearchClick = (value) => {
        this.textSearch = value;
        this.requestTarefas(value);
    }

    requestTarefas = (searchValue = '') => {
        this.setState({ refreshing: true });

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
        }).finally(() => {
            this.setState({ refreshing: false });
        })
    }

    onEditarPress = (tarefa) => {

    }

    onExcluirPress = (tarefa) => {

    }

    onConcluidaChange = (tarefa, concluida) => {
        
    }

    render() {
        const { tarefas, refreshing } = this.state;
        return (
            <View style={styles.container}>
                <TarefaSearch onSearchClick={this.onSearchClick} />

                <Divider style={styles.divider} />

                <TarefaList
                    dataSource={tarefas}
                    refreshing={refreshing}
                    onRefresh={() => this.requestTarefas(this.textSearch)}
                    onEditarPress={this.onEditarPress}
                    onExcluirPress={this.onExcluirPress}
                    onConcluidaChange={this.onConcluidaChange} />

                <Button
                    title='Nova Tarefa'
                    onPress={() => this.setState({ showForm: true })} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    divider: {
        marginVertical: 8,
    }
});
