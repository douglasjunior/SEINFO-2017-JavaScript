import React, { Component } from 'react';

import _ from 'lodash';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import TarefaList from '../components/TarefaList';
import TarefaSearch from '../components/TarefaSearch';
import TarefaForm from '../components/TarefaForm';

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
        const { tarefas, showForm, tarefaSelecionada } = this.state;
        const closeForm = () => this.setState({ showForm: false });
        return (
            <section style={{ padding: 16 }}>

                <TarefaSearch onSearchClick={this.onSearchClick} />

                <Button bsStyle="success"
                    onClick={() => this.setState({ showForm: true, tarefaSelecionada: {} })}>Nova</Button>

                <TarefaList tarefas={tarefas} onEditarClick={this.onEditarClick}
                    onExcluirClick={this.onExcluirClick} />

                <TarefaForm container={this} show={showForm} onHide={closeForm}
                    onSave={this.saveTarefa} tarefa={tarefaSelecionada} />

            </section>
        )
    }
}

export default TarefaPage;
