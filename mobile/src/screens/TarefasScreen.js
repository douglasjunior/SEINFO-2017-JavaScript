import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
} from 'react-native';

import _ from 'lodash';
import axios from 'axios';

import Divider from '../components/Divider';
import TarefaSearch from '../components/TarefaSearch';
import TarefaList from '../components/TarefaList';
import TarefaForm from '../components/TarefaForm';

export default class TarefasScreen extends Component {

    state = {
        tarefas: [],
        refreshing: false,
        tarefaSelecionada: null,
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

    onEditarPress = (tarefaId) => {
        axios.get('/tarefas/' + tarefaId)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        tarefaSelecionada: response.data,
                        showForm: true,
                    });
                } else {
                    console.warn(response);
                }
            }).catch((ex) => {
                console.warn(ex);
            })
    }

    onExcluirPress = (tarefaId) => {
        Alert.alert('Excluir', `Deseja excluir a tarefa ${tarefaId}?`, [
            {
                text: 'Cancelar',
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: () => {
                    axios.delete('/tarefas/' + tarefaId)
                        .then((response) => {
                            if (response.status === 204) {
                                const { tarefas } = this.state;
                                _.remove(tarefas, { id: tarefaId });
                                this.setState({ tarefas });
                            } else {
                                console.warn(response);
                            }
                        }).catch((ex) => {
                            console.warn(ex);
                        })
                }
            },
        ], { cancelable: true })
    }

    onConcluidaChange = (tarefaId, concluida) => {
        let method;
        if (concluida) {
            method = axios.put;
        } else {
            method = axios.delete;
        }

        method('/tarefas/' + tarefaId + "/concluida")
            .then((response) => {
                if (response.status === 204) {
                    const { tarefas } = this.state;
                    _.find(tarefas, { id: tarefaId }).concluida = concluida;
                    this.setState({ tarefas });
                } else {
                    console.warn(response);
                }
            }).catch((ex) => {
                console.warn(ex);
            })
    }

    saveTarefa = (tarefa) => {
        if (!tarefa.id) {
            this.newTarefa(tarefa);
        } else {
            this.updateTarefa(tarefa);
        }
    }

    newTarefa = (tarefa) => {
        axios.post('/tarefas/', tarefa)
            .then((response) => {
                if (response.status === 201) {
                    const { tarefas } = this.state;
                    tarefas.unshift(response.data);
                    this.setState({ showForm: false, tarefas });
                } else {
                    console.warn(response);
                }
            }).catch((ex) => {
                console.warn(ex);
            })
    }

    updateTarefa = (tarefa) => {
        axios.put('/tarefas/' + tarefa.id, tarefa)
            .then((response) => {
                if (response.status === 200) {
                    const { tarefas } = this.state;
                    _.remove(tarefas, { id: tarefa.id });
                    tarefas.unshift(response.data);
                    this.setState({ showForm: false, tarefas });
                } else {
                    console.warn(response);
                }
            }).catch((ex) => {
                console.warn(ex);
            })
    }

    render() {
        const { tarefas, refreshing, tarefaSelecionada, showForm } = this.state;
        const closeForm = () => this.setState({ showForm: false });
        return (
            <View style={styles.container}>
                <TarefaSearch onSearchClick={this.onSearchClick} />

                <Divider />

                <TarefaList
                    dataSource={tarefas}
                    refreshing={refreshing}
                    onRefresh={() => this.requestTarefas(this.textSearch)}
                    onEditarPress={this.onEditarPress}
                    onExcluirPress={this.onExcluirPress}
                    onConcluidaChange={this.onConcluidaChange} />

                <Button
                    title='Nova Tarefa'
                    onPress={() => this.setState({ showForm: true, tarefaSelecionada: {} })} />

                <TarefaForm visible={showForm} onRequestClose={closeForm}
                    onSave={this.saveTarefa} tarefa={tarefaSelecionada} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});
