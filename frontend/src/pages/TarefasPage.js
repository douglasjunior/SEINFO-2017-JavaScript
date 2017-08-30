import React, { Component } from 'react';

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
