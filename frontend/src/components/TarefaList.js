import React, { Component } from 'react';

import { Table, } from 'react-bootstrap';

import TarefaItem from './TarefaItem';

class TarefaList extends Component {

    render() {
        const { tarefas, onEditarClick, onExcluirClick, onConcluidaChange } = this.props;

        const tableItems = tarefas.map((tarefa, index) => {
            return <TarefaItem key={index} {...tarefa}
                onEditarClick={onEditarClick} onExcluirClick={onExcluirClick} onConcluidaChange={onConcluidaChange} />
        })

        return (
            <Table  >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tarefa</th>
                        <th>Criado em</th>
                        <th>Concluída</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
                <tfoot>

                </tfoot>
            </Table>
        )
    }
}

export default TarefaList;