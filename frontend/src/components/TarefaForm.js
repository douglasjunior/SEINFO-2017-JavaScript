import React, { Component } from 'react';

import {
    Modal, FormGroup, ControlLabel,
    FormControl, Button,
} from 'react-bootstrap';

class TarefaForm extends Component {

    state = {}

    componentWillReceiveProps(nextProps) {
        if (this.props.tarefa !== nextProps.tarefa) {
            const state = {};
            if (nextProps.tarefa) {
                state.id = nextProps.tarefa.id;
                state.titulo = nextProps.tarefa.titulo;
                state.descricao = nextProps.tarefa.descricao;
            }
            this.state = state;
        }
    }

    onTituloChange = (event) => {
        this.setState({ titulo: event.target.value })
    }

    onDescricaoChange = (event) => {
        this.setState({ descricao: event.target.value })
    }

    render() {
        const { show, container, onHide, onSave, } = this.props;

        const { titulo, id, descricao } = this.state;

        return (
            <Modal
                show={show}
                onHide={onHide}
                container={container}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup >
                        <ControlLabel>#</ControlLabel>
                        <FormControl type="text" disabled value={id || ''} />
                    </FormGroup>
                    <FormGroup >
                        <ControlLabel>Título</ControlLabel>
                        <FormControl type="text" value={titulo || ''} onChange={this.onTituloChange} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Descrição</ControlLabel>
                        <FormControl componentClass="textarea" value={descricao || ''} onChange={this.onDescricaoChange} />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Cancelar</Button>
                    <Button onClick={() => onSave(this.state)} bsStyle="primary">Salvar</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default TarefaForm;