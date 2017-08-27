import React, { Component } from 'react';

import axios from 'axios';
//import { } from 'react-bootstrap';

import TarefaList from '../components/TarefaList';

const TAREFAS = [
    { id: 1, titulo: "Título", descricao: "desc", data_criacao: "17/05/1989", concluida: true },
    { id: 1, titulo: "Título", descricao: "desc", data_criacao: "17/05/1989", concluida: false },
    { id: 1, titulo: "Título", descricao: "desc", data_criacao: "17/05/1989", concluida: false },
    { id: 1, titulo: "Título", descricao: "desc", data_criacao: "17/05/1989", concluida: true },
    { id: 1, titulo: "Título", descricao: "desc", data_criacao: "17/05/1989", concluida: false },
    { id: 1, titulo: "Título", descricao: "desc", data_criacao: "17/05/1989", concluida: true },
    { id: 1, titulo: "Título", descricao: "desc", data_criacao: "17/05/1989", concluida: true },
    { id: 1, titulo: "Título", descricao: "desc", data_criacao: "17/05/1989", concluida: false },
]

class TarefaPage extends Component {

    state = {
        tarefas: []
    }

    componentDidMount() {
        axios.get('http://192.168.100.5:3000/tarefas')
            .then((response) => {
                this.setState({ tarefas: response.data.dados });
            }).catch((ex) => {
                console.warn(ex);
            })
    }

    render() {

        return (
            <section>
                <TarefaList tarefas={this.state.tarefas} />
            </section>
        )
    }
}

export default TarefaPage;