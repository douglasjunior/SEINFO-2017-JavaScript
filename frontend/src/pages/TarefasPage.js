import React, { Component } from 'react';

import _ from 'lodash';
import axios from 'axios';

import TarefaList from '../components/TarefaList';
import TarefaSearch from '../components/TarefaSearch';

class TarefaPage extends Component {

    state = {
        tarefas: []
    }

    componentDidMount() {
        this.requestTarefas();
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
        })
    }

    onSearchClick = (value) => {
        this.textSearch = value;
        this.requestTarefas(value);
    }

    onEditarClick = (tarefaId) => {
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

    onExcluirClick = (tarefaId) => {
        if (window.confirm(`Deseja excluir a tarefa ${tarefaId}?`) === true) {
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
    }

    saveTarefa = (tarefa) => {
        if (!tarefa.id) {
            this.newTarefa(tarefa);
        } else {
            this.updateTarefa(tarefa);
        }
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

    render() {
        const { tarefas } = this.state;
        return (
            <section style={{ padding: 16 }}>

                <TarefaSearch onSearchClick={this.onSearchClick} />

                <TarefaList tarefas={tarefas} onEditarClick={this.onEditarClick}
                    onExcluirClick={this.onExcluirClick} onConcluidaChange={this.onConcluidaChange} />

            </section>
        )
    }
}

export default TarefaPage;
