import React, { Component } from 'react';

import {
    Button, ButtonGroup,
    ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import moment from 'moment';

class TarefaItem extends Component {

    render() {
        const { id, titulo, data_criacao, concluida, onExcluirClick, onEditarClick } = this.props;
        return (
            <tr>
                <td>{id}</td>
                <td>{titulo}</td>
                <td>{moment(data_criacao).format("DD/MM/YYYY HH:mm")}</td>
                <td>
                    <ToggleButtonGroup
                        type="checkbox" bsSize="small"
                        value={concluida}
                        onChange={() => {}}
                    >
                        <ToggleButton value={false}>Pendene</ToggleButton>
                        <ToggleButton value={true}>Concluída</ToggleButton>
                    </ToggleButtonGroup>
                </td>
                <td>
                    <ButtonGroup bsSize="small">
                        <Button onClick={() => onEditarClick(id)} bsStyle="warning">Editar</Button>
                        <Button onClick={() => onExcluirClick(id)} bsStyle="danger">Excluir</Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }
}

export default TarefaItem;
